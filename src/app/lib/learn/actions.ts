'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string().min(1, 'Please select a customer.'),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.union([
    z.literal('pending'),
    z.literal('paid')
  ], {
    message: 'Please select an invoice status.'
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// 비밀번호 변경
const UpdatePasswordSchema = z.object({
  email:z.email({message:'이메일 주소 다름.'}),
  oldPassword:z.string().min(6, {message:'6자 이상'}),
  newPassword:z.string().min(6, {message:'신규 패스워드 6자 이상'}),
  confirmPassword:z.string().min(6)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "신규 패스워드가 같지 않음.",
  path: ["confirmPassword"],
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// 비밀번호 변경
export type PasswordState = {
  // errors?: {
  //   email?: string[];
  //   oldPassword?: string[];
  //   newPassword?: string[];
  //   confirmPassword?: string[];
  // };
  errors?: any; // or <string, any>
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {  
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId') || "",
    amount: formData.get('amount'),
    status: formData.get('status') || '',
  });
  // console.log(formData.get('customerId'))
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    // const flattenedErrors = validatedFields.error.flatten().fieldErrors;
    const flattenedErrors = z.treeifyError(validatedFields.error);    
    
    return {
      errors: flattenedErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/learn/dashboard/invoices');
  redirect('/learn/dashboard/invoices');
  // console.log('customerId : ' + customerId);
  // console.log('amountInCents : ' + amountInCents);
}

export async function updateInvoice(id: string, prevState: State, formData: FormData,) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/learn/dashboard/invoices');
  redirect('/learn/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/learn/dashboard/invoices');
}

export async function login(prevState: string | undefined,formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        //case 'CredentialsSignin' : NextAuth.js에서 에러 타입이 '자격 증명 실패(아이디/비번 틀림)'인 경우
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// 비밀번호 변경
// prevState : 초기값 null, 폼을 제출하기 직전 이전 값을 저장하고 있음.
// ex) if (prevState.attemptCount > 3) return { message: "3회 이상 시도" }
export async function updatePassword(prevState: PasswordState | undefined, formData: FormData): Promise<PasswordState> {
  // formData.entries() : 폼값을 [key, value], [key, value]..으로 추출
  // Object.fromEntries() : Form 데이터를 js Object 처리, Zod는 객체 대상 검증 수행(왠만한 라이브러리들도)
  // .safeParse() : UpdatePasswordSchema 와 비교, 성공시 success: true
  const validatedFields = UpdatePasswordSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      // errors: validatedFields.error.flatten().fieldErrors,
      //flatten() : 평면 구조에서 활용(사용 중단 권고) , treeifyError() : 중첩 구조에서 활용
      errors: z.treeifyError(validatedFields.error),
      message: '입력값을 확인해주세요.',
    };
  }

  const { email, oldPassword, newPassword } = validatedFields.data;
  try {
    // Storage > Database > Data > users 와 비교
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    if (!user.length) {
      return { 
        message: '해당 이메일로 가입된 사용자가 없습니다.' 
      };
    }
    // 기존 비번 비교
    const passwordsMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!passwordsMatch) {
      return { 
        message: '기존 비밀번호가 일치하지 않습니다.' 
      };
    }
    // 새 비번 업데이트
    const hashedPassword = await bcrypt.hash(newPassword, 10);    
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE email = ${email}
    `;
  } catch (error) {
    return { 
      message: 'Database Error: 비밀번호 변경에 실패했습니다.' 
    };
  }
  revalidatePath('/learn/login');
  redirect('/learn/login');
}