import React, { useState } from 'react';
import styles from './TimeTable.module.css';
import Modal from 'react-modal';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../../recoil/userAtom';
import { changeTimeFormatDay } from '../../../utils/timeFormat';
import {
  addProduct,
  updateProduct,
} from '../../../apis/services/productServices';
import { useProductAxios } from '../../../apis/config/product_interceptors';

const times = [
  {
    time: '10:00',
    state: 0,
  },
  {
    time: '10:30',
    state: 0,
  },
  {
    time: '11:00',
    state: 0,
  },
  {
    time: '11:30',
    state: 0,
  },
  {
    time: '12:00',
    state: 0,
  },
  {
    time: '12:30',
    state: 0,
  },
  {
    time: '13:00',
    state: 0,
  },
  {
    time: '13:30',
    state: 0,
  },
  {
    time: '14:00',
    state: 0,
  },
  {
    time: '14:30',
    state: 0,
  },
  {
    time: '15:00',
    state: 0,
  },
  {
    time: '15:30',
    state: 0,
  },
  {
    time: '16:00',
    state: 0,
  },
  {
    time: '16:30',
    state: 0,
  },
  {
    time: '17:00',
    state: 0,
  },
  {
    time: '17:30',
    state: 0,
  },
  {
    time: '18:00',
    state: 0,
  },
  {
    time: '18:30',
    state: 0,
  },
  {
    time: '19:00',
    state: 0,
  },
  {
    time: '19:30',
    state: 0,
  },
];

const TimeTable = ({ selectedDate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timeState, setTimeState] = useState(times);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [checkState, setCheckState] = useState(0);

  const userId = useRecoilValue(userIdState);

  useProductAxios();

  const onOpenModal = (idx) => {
    setSelectedIdx(idx);
    setModalIsOpen(true);
  };

  function onCloseModal() {
    setModalIsOpen(false);
  }

  const onChangeIdx = (idx) => {
    setCheckState(idx);
  };

  const onChangeTimeState = async () => {
    const updatedData = { ...timeState[selectedIdx], state: checkState };
    const updatedTimeState = [...timeState];
    updatedTimeState[selectedIdx] = updatedData;

    setTimeState(updatedTimeState);

    // TODO:  상담 가능 시간 설정 및 업데이트
    // TODO:  상담 가능 시간 설정 및 업데이트
    // TODO:  나중에 해당 날짜 상품 목록 조회 API 연동 후 붙여야됨.
    /* const data = {
      reservationDate: changeTimeFormatDay(selectedDate),
      reservationTime: timeState[selectedIdx].time + ':00',
      productProceedType: 'F2F',
    };

    const res = await updateProduct(data);

    if (!res) alert('수정에 실패했습니다'); */
    /* 
    const data = {
      consultantId: userId,
      reservationDate: changeTimeFormatDay(selectedDate),
      reservationTime: timeState[selectedIdx].time + ':00',
      productProceedType: 'F2F',
    };

    const res = await addProduct(data);

    if (!res) alert('등록에 실패했습니다');

 */ onCloseModal();
  };

  return (
    <div className={styles.tableBox}>
      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        contentLabel="Example Modal"
      >
        <div className={styles.modalContent}>
          <div className={styles.btnBox}>
            <button
              className={`${styles.btn} ${styles.contact}  ${
                checkState === 1 ? styles.selected : ''
              }`}
              onClick={() => onChangeIdx(1)}
            >
              대면
            </button>
            <button
              className={`${styles.btn} ${styles.nonContact} ${
                checkState === 2 ? styles.selected : ''
              }`}
              onClick={() => onChangeIdx(2)}
            >
              비대면
            </button>
          </div>
          <button
            className={`${styles.btn} ${styles.insertBtn}`}
            onClick={onChangeTimeState}
          >
            설정완료
          </button>
        </div>
      </Modal>
      {timeState.map((data, index) => {
        return (
          <button
            key={index}
            className={`${styles.timeTableBox} ${
              data.state !== 0
                ? data.state === 1
                  ? styles.contact
                  : styles.nonContact
                : ''
            }`}
            onClick={() => onOpenModal(index)}
          >
            <p>{data.time}</p>
          </button>
        );
      })}
    </div>
  );
};

export default TimeTable;
