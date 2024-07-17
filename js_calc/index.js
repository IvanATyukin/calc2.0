const ac = document.getElementById("btn_ac")
const reverse = document.getElementById("btn_reverse")
const window_output = document.getElementById("output")
const digit = document.querySelectorAll(".btn_digit")
const btn = document.querySelectorAll(".btn")
const btn_sign = document.querySelectorAll(".btn_sign")
const res = document.getElementById("btn_result")
const percent = document.getElementById("btn_percent")
let max = 9
let a = '0'
let b = ''
let sign = ''
let previous_b = ''
let previous_sign = ''
let finish = 0
let err = 0
window_output.textContent = a 
let change_sign = 0

function AC () {
    err = 0
    finish = 0
    a = '0'
    b = ''
    sign = ''
    previous_sign = 0
    previous_b = 0
}

function Reverse_Sign () {
    if (sign == '') {
        a = String(-Number(a))
    }
    else {
        b = String(-Number(b))
    }
}

function Percent () {
    if (sign == '') {
        a = String(Number(a) / 100)
    }
    else {
        b = String(Number(b) / 100)
    }
}

function Add_Digit (added_digit) {
    dig = added_digit.textContent

    if (err){
        AC()
        err = 0
    }

    if (a == '0' && dig != '.')
        a = ''

    if (b == '0' && dig != '.')
        b = ''

    if (sign == '') {
        if (finish && a) {
            finish = 0
            a = String(dig)
        }
        else if (!(a == '0' && dig == 0) && a.length <= max)
            a += String(dig)
    }
    else {
        if (!(b == '0' && dig == 0) && b.length <= max)
            b += String(dig)
    }
}

function Btn_Sign (par_sign) {
    sign = par_sign.textContent

    if (previous_sign != sign)
        previous_b = ''
}

function Result () {
    if (sign == '')
        if (previous_sign == '') 
            return
        else
            sign = previous_sign

    if (b == "")
        if (previous_b == '')
            b = a 
        else
            b = previous_b

    if (sign == '*')
        a = Number(a) * Number(b)
    else if (sign == '/')
        if (b == '0') {
            err = 1
            window_output.textContent = "error"
            return
        }
        else
            a = Number(a) / Number(b)
    else if (sign == '+')
        a = Number(a) + Number(b)
    else if (sign == '-')
        a = Number(a) - Number(b)

    a = String(a)
    previous_b = b
    previous_sign = sign
    b = ''
    sign = ''
    finish = 1
}

function ResultWindow (par_sign) {
    console.log(`ResultWindow: a = ${a}, b = ${b}, sign = ${sign}, finish = ${finish}, err = ${err}`)
    if (err) 
        return
    if (a.length > max + 1){
        window_output.textContent = "too long"
        err = 1
        return
    }
    if (sign == '' || par_sign.classList.contains('btn_sign')) 
        window_output.textContent = a 
    else 
        window_output.textContent = b
}


btn_sign.forEach((e) => e.addEventListener('click', () => Btn_Sign(e)))
digit.forEach((e) => e.addEventListener('click', () => Add_Digit(e)))
reverse.addEventListener('click', () => Reverse_Sign())
ac.addEventListener('click', () => AC())
res.addEventListener('click', () => Result())
percent.addEventListener('click', () => Percent())
btn.forEach((e) => e.addEventListener('click', () => ResultWindow(e)))
