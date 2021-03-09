function fridayTheThirteenths(start, end) {
    let startDate = new Date(`01.01.${start}`)
    let endDate = new Date(`01.01.${end + 1}`)

    let checkDate = startDate;
    let resultArr = []
    let resultStr

    if (!end) {
        while (resultArr.length === 0) {
            if (checkDate.getDay() === 5 && checkDate.getDate() === 13) {
                resultArr.push(`${checkDate.getMonth() + 1}/13/${checkDate.getFullYear()}`)
            }

            checkDate.setDate(checkDate.getDate() + 1);
        }
    } else {
        while (checkDate <= endDate) {
            if (checkDate.getDay() === 5 && checkDate.getDate() === 13) {
                resultArr.push(`${checkDate.getMonth() + 1}/13/${checkDate.getFullYear()}`)
            }

            checkDate.setDate(checkDate.getDate() + 1);
        }
    }

    return resultStr = resultArr.join(' ')
}


