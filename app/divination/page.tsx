'use client';
import { useState } from 'react';
import { currentTimeStart, timeStart, numberStart } from './util';
import type { DivinationResult } from './util';
import dayjs from 'dayjs';

export default function Page() {
  const [result, setResult] = useState<DivinationResult | null>(null);

  const [tab, setTab] = useState<'current' | 'time' | 'number'>('current');
  const [customDate, setCustomDate] = useState<Date>(new Date());
  const [numbers, setNumbers] = useState<[number, number, number]>([1, 1, 1]);

  const handleCurrentStart = () => {
    const result = currentTimeStart();
    setResult(result);
  };

  const handleTimeStart = () => {
    const result = timeStart(customDate);
    setResult(result);
  };

  const handleNumberStart = () => {
    const result = numberStart(...numbers);
    setResult({
      solar: '',
      lunar: '',
      result: result.result,
    });
  };

  const handleTabChange = (tab: 'current' | 'time' | 'number') => {
    setTab(tab);
    setResult(null);
  };

  return (
    <div className="flex-1">
      <div className="mx-auto max-w-3xl bg-white shadow-lg">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white py-6 text-center">
          <h1 className="top-0 text-3xl font-bold text-gray-800">卜算</h1>
          <div className="mt-2 px-4 text-left text-gray-600">
            <p>前言：占卜只在两种情况下起局才会灵验。</p>
            <p>1. 动象发生之后，例如：飞鸟坠地、杯子打碎、天上打雷、手指割破、灵光一闪···</p>
            <p>2. 有问才能有答，一问一答形成一阴一阳。</p>
            <p>起局：依据某种方式开启占卜，以下为三种起局方式。</p>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => handleTabChange('current')}
              className={`rounded-lg px-4 py-2 ${
                tab === 'current' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              当前时间
            </button>
            <button
              onClick={() => handleTabChange('time')}
              className={`rounded-lg px-4 py-2 ${
                tab === 'time' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              指定时间
            </button>
            <button
              onClick={() => handleTabChange('number')}
              className={`rounded-lg px-4 py-2 ${
                tab === 'number' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              指定数字
            </button>
          </div>
        </header>
        <div className="p-8">
          {(tab === 'current' || tab === 'time') && (
            <>
              {tab === 'time' && (
                <div className="mb-4">
                  <input
                    type="datetime-local"
                    value={dayjs(customDate).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => {
                      console.log(e.target.value, new Date(e.target.value));
                      setCustomDate(new Date(e.target.value));
                    }}
                    className="w-full rounded-lg border border-gray-300 p-2"
                  />
                </div>
              )}
              <button
                onClick={tab === 'current' ? handleCurrentStart : handleTimeStart}
                className="w-full rounded-lg bg-indigo-600 py-3 text-white transition-colors hover:bg-indigo-700"
              >
                开始卜算
              </button>

              {result && (
                <div className="mt-8 space-y-6">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="text-gray-600">阳历</span>
                    <span className="text-lg font-medium">{result.solar}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <span className="text-gray-600">农历</span>
                    <span className="text-lg font-medium">{result.lunar}</span>
                  </div>

                  {result.result && (
                    <div className="rounded-lg border border-gray-200 p-6">
                      <h3 className="mb-4 text-xl font-bold">卦象详解</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p>
                            <span className="text-gray-600">卦名：</span>
                            {result.result.name}
                          </p>
                          <p>
                            <span className="text-gray-600">状态：</span>
                            {result.result.status}
                          </p>
                          <p>
                            <span className="text-gray-600">五行：</span>
                            {result.result.wuxing}
                          </p>
                          <p>
                            <span className="text-gray-600">方位：</span>
                            {result.result.direction}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p>
                            <span className="text-gray-600">神兽：</span>
                            {result.result.shenshou}
                          </p>
                          <p>
                            <span className="text-gray-600">颜色：</span>
                            {result.result.color}
                          </p>
                          <p>
                            <span className="text-gray-600">数字：</span>
                            {result.result.number.join(', ')}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="mb-1 text-gray-600">含义：</p>
                          <p className="text-gray-800">{result.result.mean}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="mb-1 text-gray-600">口诀：</p>
                          <p className="whitespace-pre-line text-gray-800">{result.result.koujue}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {tab === 'number' && (
            <>
              <div className="mb-4 flex space-x-4">
                {numbers.map((num, index) => (
                  <input
                    key={index}
                    type="number"
                    value={num}
                    onChange={(e) => {
                      const newNumbers = [...numbers];
                      newNumbers[index] = parseInt(e.target.value);
                      setNumbers(newNumbers as [number, number, number]);
                    }}
                    className="w-full rounded-lg border border-gray-300 p-2"
                    min="1"
                    max="10"
                  />
                ))}
              </div>
              <button
                onClick={handleNumberStart}
                className="w-full rounded-lg bg-indigo-600 py-3 text-white transition-colors hover:bg-indigo-700"
              >
                开始卜算
              </button>

              {result && result.result && (
                <div className="mt-8 rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-xl font-bold">卦象详解</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-600">卦名：</span>
                        {result.result.name}
                      </p>
                      <p>
                        <span className="text-gray-600">状态：</span>
                        {result.result.status}
                      </p>
                      <p>
                        <span className="text-gray-600">五行：</span>
                        {result.result.wuxing}
                      </p>
                      <p>
                        <span className="text-gray-600">方位：</span>
                        {result.result.direction}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-600">神兽：</span>
                        {result.result.shenshou}
                      </p>
                      <p>
                        <span className="text-gray-600">颜色：</span>
                        {result.result.color}
                      </p>
                      <p>
                        <span className="text-gray-600">数字：</span>
                        {result.result.number.join(', ')}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="mb-1 text-gray-600">含义：</p>
                      <p className="text-gray-800">{result.result.mean}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="mb-1 text-gray-600">口诀：</p>
                      <p className="whitespace-pre-line text-gray-800">{result.result.koujue}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
