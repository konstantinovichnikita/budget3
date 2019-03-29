let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    sum = 0;
    

let money, time;

expensesBtn.setAttribute('disabled','disabled');
optionalExpensesBtn.setAttribute('disabled','disabled');
countBtn.setAttribute('disabled','disabled');

startBtn.addEventListener('click', function() { // пишем функцию для кнопки "Начать расчет"
    expensesBtn.removeAttribute('disabled');
    optionalExpensesBtn.removeAttribute('disabled');
    countBtn.removeAttribute('disabled');
    money = +prompt("Ваш бюджет на месяц?"); // плюс для того чтобы мы получали данныые в виде чисел
    time = prompt("Введите дату в формате YYYY-MM-DD"); // 2 вопросы ответы которых мы записываем в переменные

    while(isNaN(money) || money == "" || money == null) { // isNaN возвращает true если туда попали не цифры 
        money = prompt("Ваш бюджет на месяц?"); // в итоге если пользователь напишет не цифры, оставит пустой строку или нажмет отмена, то мы еще раз задаем ему вопрос
    }
    appData.budget = money; // бюджет который указал пользователь четко зафиксирован в глобальном объекте appData 
    appData.timeData = time; // дату передаем от пользователя в глобальный объект
    budgetValue.textContent = money.toFixed(); // записываем данные которые получили от пользователя в пустой блок budgetValue
// toFixed - округляем до ближайшего целого числа    
    yearValue.value = new Date(Date.parse(time)).getFullYear(); 
// когда пользователь дал нам данные в виде YYYY-MM-DD, мы их поместили в (time)
// теперь эти команды будут обработаны командой Date.parse, они превратяться в количество милисекунд начиная с 1970 года
// потом эти милисекунды используються для создания "новой" даты
// для того что получить год из этой даты используем метод .getFullYear()
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
// для получения месяца используем .getMonth()    
// в JS все начинаеться с нуля, для коректного отображения месяца - прибавляем единицу
    dayValue.value = new Date(Date.parse(time)).getDate();

});



expensesBtn.addEventListener('click', function() { // пишем функцию для кнонки "Введите обязательные расходы"
    sum = 0;
    for (let i = 0; i < expensesItem.length; i++) { // запускаем цикл действий, чтобы не писать несколько раз prompt с вопросом
        // задаем переменную i = 0 которая будет вызывать действия пока не достигнет количество инпутов (expensesItem.length)
        let a = expensesItem[i].value, // сюда пойдут наименование нашего расхода
            b = expensesItem[++i].value; // сюда пойдут цены 
    // теперь пишем проверки чтобы пользователь писал только то что нужно
        if (typeof(a) === "string" && a &&
            b && a != '' && b != '' && a.length < 50 && b.length < 50) { 
            // проверяем что входящие данные будут строкой
            // проверяем чтобы "a" и "b" не равнялись null, то есть ничему
            // проверяем чтобы lenght(количестов символов) было не больше 50
            console.log("done");
            appData.expenses[a] = b; // так мы задаем новое свойство и значение в объекте appData
            // для передачи значений в объект мы ставим [сюда можем поместить любую переменную]
            sum += +b; // собираем сумму всех значений который ввел пользователь
        } else {
            i = i - 1; // если пользователь ничего не напишет, всё начнеться ЗАНОВО
        }
        expensesValue.textContent = sum; // сумма котрорую мы получим запишеться в соответсвующий пустой блок
    }
});

optionalExpensesBtn.addEventListener('click', function() { // пишем функцию для кнонки "Введите необязательные расходы"
    for (let i = 0; i < optionalExpensesItem.length; i++) { // запускаем цикл действий, чтобы не писать несколько раз prompt с вопросом
        // задаем переменную i = 0 которая будет вызывать действия пока не достигнет количества инпутов optionalExpensesItem
        let opt = optionalExpensesItem[i].value; // в [] ставим i чтобы полупать данные из каждого элемента по порядку
        if (typeof(opt) === "string" && typeof(opt) != null &&
        opt != ''&& opt.length < 50) { 
            // проверяем что входящие данные будут строкой
            // проверяем чтобы "opt" не равнялись null, то есть ничему
            // проверяем чтобы lenght(количестов символов) было не больше 50
            console.log("done");
            appData.optionalExpenses[i] = opt; // так мы задаем свойство и значение в объекте appData
            // для передачи значений в объект мы ставим [сюда можем поместить любую переменную]
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; // в конце ставим разделитель с скобках
            // пишем будут записываться полученные данные и динамически отображаться
        } else {
            i = i - 1; // если пользователь ничего не напишет, всё начнеться ЗАНОВО
        }
    } 
})

countBtn.addEventListener('click', function() { // пишем функцию для кнонки "Расчитать" дневного бюджета
    
    if (appData.budget != undefined) { // пишем условия при котором, расчет будет запускаться только когда есть данные о бюджете
        appData.moneyPerDay = (+(appData.budget - sum) / 30).toFixed(); // создаем новое свойство в объект appData, которое будет содержать бюджет на один день
        dayBudgetValue.textContent = appData.moneyPerDay; // полученный дневной бюджет помещаем в пустой блок
        
        if(appData.moneyPerDay < 100) { // если бюджет на один день меньше 100
            levelValue.textContent = "Минимальный уровень достатка"; // выводим в консоль Минимальный уровень достатка
        } else if (appData.moneyPerDay > 100 & appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла какая-то ошибка";
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

incomeItem.addEventListener('input', function() { // функция для поля "Введите статьи возможного дохода через запятую"
// если аргументом поставить input, то полученные данные сразу будут появляться одновременно в пустом блоке   
// если change, то полученные данные перейдут в пустой блок после того как я уберу курсор от инпута
    let items = incomeItem.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() { // функция для галочки "Есть ли накопления"
    if (appData.savings == true) { // если уже стоит галочка то при клике она выключает функцию и наоборот
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent; // высчитываем месячный доход математически    
        appData.yearIncome = sum/100*percent; // расчет на один год

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1); // помещаем полученные данные в пустой блок
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1); // помещаем полученные данные в пустой блок
    }
});

percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent; // высчитываем месячный доход математически    
        appData.yearIncome = sum/100*percent; // расчет на один год

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1); // помещаем полученные данные в пустой блок
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1); // помещаем полученные данные в пустой блок
    }
});

let appData = { // главный объект, который содержит все данные
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseIncome: function() { // создаем метод для получения значений дополнительного дохода, который запишем в массив Income
        for ( let u = 0; u < 1; u++) {

            // то что мы получим от пользователя нам нужно записать в массив income
            // для этого используем метод split, который превратит строку в массив и разделитель запятую
            appData.income.push(prompt('Может что-то еще?')); // спрошиваем не забыл ли пользователь что-то
            // для того чтобы добавить что-то в конец массива пишем push
            appData.income.sort(); // сортируем полученные данные по алфавиту
            appData.income.forEach(function(item, n, items) { // достаем информацию которую ввел пользователь и выводим на экран
                alert("Способы доп. заработка: " + items); // item - каждый елемент введенный пользователем, n его порядковый номер
            });
        }
    }
};

for (let key in appData) {  // делаем цикл в котором key это каждое свойство в appData
    console.log("Наша программа включает в себя данные: " + key) // выводим на экран все свойства
}

