/* global temp:true */

/* eslint no-undef: 2 */

const SECRET_COMBO = [1, 3, 5, 1]

const lockState = window.mobx.observable({
  locked: true,
  wheels: [0, 0, 0, 0]
})

function changeDialValue (index, incrementBy) {
  /* check if next val is within range, if not loop back around */
  temp = this.lockState.wheels[index]
  if (temp === 9 && incrementBy > 0) {
    temp = 0
  } else if (temp < 1 && incrementBy < 0) {
    temp = 9
  } else {
    temp += incrementBy
  }
  this.lockState.wheels[index] = temp /* assign combo new value */

  this.lockState.locked = check() /* check if lock is unlocked */

  if (this.lockState.locked === false) {
    window.redirect('ConleyPrice') /* redirect to profile page if lock is unlocked */
  }
}

/* Funciton checks if lock combo is same as the secret combo, retur true if same else false */
function check () {
  for (let i = 0; i < 4; i++) {
    if (this.lockState.wheels[i] !== SECRET_COMBO[i]) {
      return true
    }
  }
  return false
}

// let our other modules find our functions
window.lockState = lockState
window.changeDialValue = changeDialValue
