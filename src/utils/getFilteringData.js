// import useStore from "../store";

// const { age, selectedCategories } = useStore((state) => ({
//   age: state.age,
//   selectedCategories: state.selectedCategories,
// }));

export const get_now_data = () => {
  let userDate = undefined;
  let userTime = undefined;

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();

  // 현재 요일
  userDate = days[now.getDay()];

  // 현재 시간
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 시간을 2자리 숫자로 변환하는 함수
  const twoDigits = (num) => (num < 10 ? "0" : "") + num;

  userTime = `${twoDigits(hours)}:${twoDigits(minutes)}`;

  return { userDate, userTime };
};
