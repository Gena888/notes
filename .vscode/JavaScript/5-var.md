Существует 2 основных отличия var от let/const:

Переменные var не имеют блочной области видимости, они ограничены, как минимум, телом функции.
Объявления (инициализация) переменных var производится в начале исполнения функции (или скрипта для глобальных переменных).

В браузерах, если только мы не используем модули, глобальные функции и переменные, объявленные с помощью var, становятся свойствами глобального объекта.