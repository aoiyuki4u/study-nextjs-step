"use client";
import { useEffect, useState, useRef } from "react";
import { useCarStore } from "@/store/useCarStore";
import Image from 'next/image';
import Car360Canvas from '@/app/quote/components/Car360Canvas';
import Car360Images from '@/app/quote/components/Car360Images';


export default function CarEstimation(){
  const { cars, fetchCars, selectedCar, setCar, selectedOptionIds, toggleOption, isLoading } = useCarStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  //선택된 차량 옵션 > filter로 선택된 옵션만 > reduce 필터링된 배열 돌며 가격을 합산
  const totalOptionPrice = selectedCar?.options
    .filter((opt) => selectedOptionIds.includes(opt.opt_id))
    .reduce((acc, cur) => acc + cur.opt_price, 0) || 0;
  const totalAmount = (selectedCar?.base_price || 0) + totalOptionPrice;

  if (isLoading) return <div className="p-10">loading...</div>;
  
  return (
    <div className="h-full p-8">
      <header className="mb-10">
        <h1 className="text-2xl font-bold">Request a Quote</h1>
      </header>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* 촤측 */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Selection</label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center hover:bg-white hover:border-slate-400 transition-all shadow-sm"
            >
              <span className="font-bold">{selectedCar?.model_name || "모델을 선택하세요"}</span>
              <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                {cars.map((car) => (
                  <div
                    key={car.model_id}
                    onClick={() => { 
                      setCar(car); 
                      setIsOpen(false); 
                    }}
                    className="p-4 hover:bg-slate-50 cursor-pointer border-b last:border-0 flex justify-between items-center group"
                  >
                    <span className="font-medium group-hover:text-blue-600">{car.model_name}</span>
                    <span className="text-xs text-slate-400">{car.base_price?.toLocaleString()}원~</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>        

        {/* 중앙 */}
        <div className="col-span-12 lg:col-span-6 relative aspect-video bg-slate-100 rounded-3xl shadow-inner flex justify-center">
          {selectedCar ? (
            <div className="w-full h-full">
              <div className="relative">
                <Car360Canvas 
                  serverUrl={selectedCar.img_server_url} 
                  extension={selectedCar.img_extension} 
                  totalFrames={selectedCar.total_frames}
                  baseImage={selectedCar.model_base_img}
                  modelName={selectedCar.model_name}
                />
                <div className="absolute top-2 left-2 px-2 py-1 font-bold">Canvas Version</div>
              </div>

              <div className="relative w-full h-full">
                <Car360Images 
                  serverUrl={selectedCar.img_server_url} 
                  extension={selectedCar.img_extension} 
                  totalFrames={selectedCar.total_frames}
                  baseImage={selectedCar.model_base_img}
                  modelName={selectedCar.model_name}
                />
                <div className="absolute top-2 left-2 px-2 py-1 font-bold">Image Version</div>
              </div>
            </div>
          ) : (
            <div className="row-span-2 flex items-center justify-center text-slate-400">
              Model Selection
            </div>
          )}
        </div>

        {/* 우측 */}
        <div className="col-span-12 lg:col-span-3 flex flex-col h-full min-h-[600px] pr-2">
          <div className="flex-grow space-y-4 overflow-y-auto max-h-[500px]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Option</h3>
            <div className="flex flex-col gap-y-2">
              {selectedCar?.options.map((option) => (
                <div
                  key={option.opt_id}
                  onClick={() => toggleOption(option.opt_id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    selectedOptionIds.includes(option.opt_id)
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="font-semibold text-sm">{option.opt_name}</span>
                  <span className={`text-sm ${selectedOptionIds.includes(option.opt_id) ? 'text-slate-400' : 'text-slate-500'}`}>
                    +{option.opt_price.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t-2 border-slate-500">
            <div className="mb-6">
              <div className="">
                <p className="text-xm text-slate-400">기본가 : {selectedCar?.base_price.toLocaleString() || 0}원</p>
                <p className="text-xm text-blue-600">옵션 :  {totalOptionPrice.toLocaleString()}원</p>
              </div>
              <div className="mt-4 pt-4 border-t-1 border-slate-300">
                <p className="text-xs text-slate-400 font-bold mb-1">TOTAL ESTIMATE</p>
                <h4 className="text-4xl font-black tracking-tight">{totalAmount.toLocaleString()}<span className="text-lg ml-1">원</span></h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}