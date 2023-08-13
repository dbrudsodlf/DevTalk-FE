import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import MainHeader from './MainHeader';
import Header from '../Header/Header';
import MainFormList from './MainFormList';

export default function Main3() {
  //원하는 기술분야 선택 페이지
  const [hows, setHows] = useState([
    {
      id: 0,
      how: '웹',
    },
    {
      id: 1,
      how: '서버',
    },
    {
      id: 2,
      how: '디자인',
    },
    {
      id: 3,
      how: '데브옵스',
    },
    {
      id: 4,
      how: '빅데이터',
    },
    {
      id: 5,
      how: '클라우드',
    },
    {
      id: 6,
      how: '핀테크',
    },
    {
      id: 7,
      how: '보안',
    },
    {
      id: 8,
      how: '모바일앱',
    },
    {
      id: 9,
      how: '게임',
    },
    {
      id: 10,
      how: '임베디드',
    },
    {
      id: 11,
      how: 'DB',
    },
  ]);

  const [isSelect, setIsSelect] = useState([]);
  const [choose, setChoose] = useState([]);
  const [isSkillConfirm, setIsSkillConfirm] = useState(false);

  const handleClick = (i) => {
    const newArr = Array(hows.length).fill(false);
    newArr[i] = true;
    setIsSelect(newArr);
    setIsSkillConfirm(true);
  };

  useEffect(() => {
    console.log(isSelect);
    pick();
  }, [isSelect]);

  const pick = () => {
    isSelect.map((item, i) => (item === true ? setChoose(hows[i]) : null));
  };
  useEffect(() => {
    console.log(choose);
  }, [choose]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header title="상담 예약" />
      </div>
      <div className={styles.mainheader}>
        <MainHeader topic="기술 분야를" where="main4" check={isSkillConfirm} />
      </div>
      <div className={styles.choose3}>
        {hows.map((item, i) => (
          <MainFormList
            className={styles.list}
            key={i}
            isSelect={isSelect[i]}
            handleClick={handleClick}
            elementIndex={i}
            itemlist={item}
          />
        ))}
      </div>
    </div>
  );
}
