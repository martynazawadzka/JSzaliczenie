const balls = (() => {
  const balls = [];

  const randomNumber = Math.floor(Math.random() * 8);

  for (let i = 0; i < 8; i++) {
    let ball = {
      id: i,
      weight: i !== randomNumber ? 10 : 11
    };
    balls.push(ball);
  }
  return balls;
})();
console.log(balls);

const theBall = (balls => {
  const firstGroup = [];
  const secondGroup = [];
  let firstGroupWeight = 0;
  let secondGroupWeight = 0;
  let theBall;

  for (let i = 0; i < 6; i++) {
    if (i < 3) {
      firstGroup.push(balls[i]);
      firstGroupWeight += balls[i].weight;
    } else {
      secondGroup.push(balls[i]);
      secondGroupWeight += balls[i].weight;
    }
  }

  if (firstGroupWeight !== secondGroupWeight) {
    let groupWithTheBall = [];

    if (firstGroupWeight > secondGroupWeight) {
      groupWithTheBall = firstGroup;
    } else {
      groupWithTheBall = secondGroup;
    }
    console.log(groupWithTheBall);

    if (groupWithTheBall[0].weight === groupWithTheBall[1].weight) {
      return groupWithTheBall[2];
    } else if (groupWithTheBall[0].weight > groupWithTheBall[1].weight) {
      return groupWithTheBall[0];
    }
    return groupWithTheBall[1];
  } else if (balls[6].weight > balls[7].weight) {
    return balls[6];
  }
  return balls[7];
})(balls);

console.log(theBall);
