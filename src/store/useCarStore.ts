import { create } from 'zustand';

// 속성
interface Car {
  model_id: string;
  model_name: string;
  model_base_img: string;
  img_server_url:string;
  img_extension:string;
  total_frames:number;
  base_price: number;
  options: Option[];
}

interface Option {
  opt_id:string;
  opt_name:string;
  opt_price:number;
}

// 상태(초기값)
interface CarState {
  cars: Car[];               // 전체 차량 속성
  isLoading: boolean;        // 로딩 상태
  selectedCar: Car | null;   // 선택된 차량
  selectedOptionIds: string[]; // 선택된 옵션 ID들

  fetchCars: () => Promise<void>;
  setCar: (car: Car) => void;
  toggleOption: (optionId: string) => void;  
}



export const useCarStore = create<CarState>((set) => ({
  cars: [],
  isLoading: false,
  selectedCar: null,
  selectedOptionIds: [],

  fetchCars: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('http://localhost:4000/quoteCar');
      if (!res.ok) throw new Error('네트워크 응답 에러');
      const data = await res.json();
      set({ cars: data, isLoading: false });
    } catch (error) {
      console.error("데이터 로드 에러:", error);
      set({ isLoading: false });
    }
    
  },

  //선택 차량 저장, 이전 차량 옵션 제거
  setCar:(car) => set({
    selectedCar:car,
    selectedOptionIds:[]
  }),
  
  toggleOption:(optionId) => set((state) => ({
    selectedOptionIds:state.selectedOptionIds.includes(optionId)
      ? state.selectedOptionIds.filter(id => id !== optionId)
      : [...state.selectedOptionIds, optionId]
  })),
}));