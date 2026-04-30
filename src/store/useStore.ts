import { create } from 'zustand';

// 인터페이스는 대문자로 시작
// 각 객체의 속성을 정의
interface SharedItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  color: string;
}

interface SwiperItem {
  id: string;
  title: string;
  desc: string;
}

interface ImgTabItems {
  id: string;
  category: string;
  title: string;
  color: string;
}
interface Divisions {
  num: string;
  title: string;
  desc: string;
}

// 스토어에서 관리할 상태(State), 함수(Action) : 초기값 정의
interface DataState {
  sharedItems: SharedItem[];
  isSharedLoading: boolean;
  // Promise<void> : 비동기 네트워크 요청 > void 반환값 없음
  fetchSharedItems: () => Promise<void>;

  swiperItems: SwiperItem[];
  isSwiperLoading: boolean;
  fetchSwiperItems: () => Promise<void>;

  imgTabCate: string[];
  imgTabItems: ImgTabItems[];
  isImgTabLoading: boolean;
  fetchImgTabData: () => Promise<void>;

  divisions: Divisions[];
  isDivisions: boolean;
  fetchDivisions: () => Promise<void>;

  _fetchData: (url: string, targetKey: string, loadingKey: string) => Promise<void>;
}

export const useStore = create<DataState>((set, get) => ({
  // 서버에서 받아온 데이터를 담아둠
  sharedItems: [],
  isSharedLoading: false,
  
  swiperItems: [],
  isSwiperLoading: false,

  imgTabCate: [],
  imgTabItems: [],
  isImgTabLoading: false,

  divisions: [],
  isDivisions: false,

  _fetchData: async (url: string, targetKey: string, loadingKey: string) => {    
    // .set() : 스토어 저장 상태(State)를 변경, 이 함수를 사용해서만 변경, 실행되면 해당 값 컴포넌트 자동 Re render
    // 로딩 시작, as any(키 이름을 동적으로 사용)
    // [loadingKey](O), {loadingKey}(X)
    // 데이터의 값이 속성으로 쓰일 경우 중복 코드 발생 가능성
    // 배열안에 넣어서 데이터의 변수값으로만 사용(배열취급X), 재사용성
    set({ [loadingKey]: true });
    try {
      const res = await fetch(url); // 데이터 요청
      if (!res.ok) throw new Error('네트워크 응답 에러');
      const data = await res.json();
      // 받은 데이터 저장 로딩 완료
      set({ [targetKey]: data, [loadingKey]: false } as any);
    } catch (err) {
      console.error(err);
      set({ [loadingKey]: false } as any);
    }
  },
  
  fetchSharedItems: () => get()._fetchData('http://localhost:4000/sharedItems', 'sharedItems', 'isSharedLoading'),
  fetchSwiperItems: () => get()._fetchData('http://localhost:4000/swiperItems', 'swiperItems', 'isSwiperLoading'),
  fetchDivisions: async () => {
    // async : await 와 같이 사용, 데이터 완료까지 대기
    // 데이터가 있을 경우 return
    if (get().divisions.length > 0) return;
    await get()._fetchData('http://localhost:4000/divisions', 'divisions', 'isDivisions');
  },

  fetchImgTabData: async () => {
    if (get().imgTabItems.length > 0) return;
    set({ isImgTabLoading: true });
    try {
      const [catRes, itemRes] = await Promise.all([
        fetch('http://localhost:4000/imgTabCate'),
        fetch('http://localhost:4000/imgTabItems')
      ]);
      const catData = await catRes.json();
      const itemData = await itemRes.json();
      
      set({ 
        imgTabCate: catData, 
        imgTabItems: itemData, 
        isImgTabLoading: false 
      });
    } catch (err) {
      console.error(err);
      set({ isImgTabLoading: false });
    }
  },

  // fetchSharedItems: async () => {
  //   if (get().sharedItems.length > 0) return; // 이미 있으면 중단
  //   set({ isSharedLoading: true });
  //   try {
  //     const res = await fetch('http://localhost:4000/sharedItems');
  //     const data = await res.json();
  //     set({ sharedItems: data, isSharedLoading: false });
  //   } catch (err) {
  //     console.error(err);
  //     set({ isSharedLoading: false });
  //   }
  // },

  // fetchSwiperItems: async () => {
  //   if (get().swiperItems.length > 0) return;
  //   set({ isSwiperLoading: true });
  //   try {
  //     const res = await fetch('http://localhost:4000/swiperItems');
  //     const data = await res.json();
  //     set({ swiperItems: data, isSwiperLoading: false });
  //   } catch (err) {
  //     console.error(err);
  //     set({ isSwiperLoading: false });
  //   }
  // },

  // fetchImgTabData: async () => {
  //   if (get().imgTabItems.length > 0) return;
  //   set({ isImgTabLoading: true });
  //   try {
  //     const [catRes, itemRes] = await Promise.all([
  //       fetch('http://localhost:4000/imgTabCate'),
  //       fetch('http://localhost:4000/imgTabItems')
  //     ]);
  //     const catData = await catRes.json();
  //     const itemData = await itemRes.json();
      
  //     set({ 
  //       imgTabCate: catData, 
  //       imgTabItems: itemData, 
  //       isImgTabLoading: false 
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     set({ isImgTabLoading: false });
  //   }
  // },
}));