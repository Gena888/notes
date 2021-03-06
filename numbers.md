Чтобы писать числа с большим количеством нулей:

Используйте краткую форму записи чисел – "e", с указанным количеством нулей. Например: 123e6 это 123 с 6-ю нулями 123000000.
Отрицательное число после "e" приводит к делению числа на 1 с указанным количеством нулей. Например: 123e-6 это 0.000123 (123 миллионных).
Для других систем счисления:

Можно записывать числа сразу в шестнадцатеричной (0x), восьмеричной (0o) и бинарной (0b) системах счисления
parseInt(str, base) преобразует строку в целое число в соответствии с указанной системой счисления: 2 ≤ base ≤ 36.
num.toString(base) представляет число в строковом виде в указанной системе счисления base.
Для преобразования значений типа 12pt и 100px в число:

Используйте parseInt/parseFloat для «мягкого» преобразования строки в число, данные функции по порядку считывают число из строки до тех пор пока не возникнет ошибка.
Для дробей:

Используйте округления Math.floor, Math.ceil, Math.trunc, Math.round или num.toFixed(precision).
Помните, что при работе с дробями происходит потеря точности.
Ещё больше математических функций:

Документация по объекту Math. Библиотека маленькая, но содержит всё самое важное.