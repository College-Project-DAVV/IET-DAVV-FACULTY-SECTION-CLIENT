import React, { useState, useEffect } from 'react';
import styles from './slider.module.scss';
import attendance from '../../../assets/attendance.svg';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const data = [
    {
      title: "Attendance",
      desc: "This portal allows faculty to maintain regular attendance records of students in their class",
      icon: attendance,
    },
    {
      title: "Marks",
      desc: "This allows teachers to maintain marks of students in every test efficiently",
      icon: attendance,
    },
    {
      title: "Search",
      desc: "This allows you to search students using their name, roll number, email, branch, year and other details",
      icon: attendance,
    },
    {
      title: "Downloads",
      desc: "This allows teachers to download forms and templates",
      icon: attendance,
    },
    {
      title: "Feedback",
      desc: "This shows feedback about a teacher by students and parents",
      icon: attendance,
    },
  ];

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slideIndex, data.length]);

  return (
    <div className={styles.containerSlider}>
      {data.map((item, index) => (
        <div className={slideIndex === index ? styles.activeSlide : styles.slide} key={index}>
          <img src={item.icon} alt={item.title} />
          <span>{item.title}</span>
          <p>{item.desc}</p>
        </div>
      ))}
      <div className={styles.ContainerDots}>
        {Array.from({ length: 5 }).map((item, index) => (
          <div
            className={slideIndex === index  ? styles.activeDot : styles.dot}
            key={index}
            onClick={() => moveDot(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Slider
