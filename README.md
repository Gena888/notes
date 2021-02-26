пока очень желательно добавлять "use strict"; в начале ваших скриптов. Позже, когда весь ваш код будет состоять из классов и модулей, директиву можно будет опускать.

В JavaScript есть 8 основных типов.

-number для любых чисел: целочисленных или чисел с плавающей точкой; целочисленные значения ограничены диапазоном ±(253-1).
-bigint для целых чисел произвольной длины.
-string для строк. Строка может содержать ноль или больше символов, нет отдельного символьного типа.
-boolean для true/false.
-null для неизвестных значений – отдельный тип, имеющий одно значение null.
-undefined для неприсвоенных значений – отдельный тип, имеющий одно значение undefined.
-object для более сложных структур данных.
-symbol для уникальных идентификаторов.

Оператор typeof позволяет нам увидеть, какой тип данных сохранён в переменной.

Имеет две формы: typeof x или typeof(x).
Возвращает строку с именем типа. Например, "string".
Для null возвращается "object" – это ошибка в языке, на самом деле это не объект.


Строки сравниваются посимвольно в лексикографическом порядке.

Значения разных типов при сравнении приводятся к числу. Исключением является сравнение с помощью операторов строгого равенства/неравенства.


Оператор объединения с null ?? — это быстрый способ выбрать первое «определённое» значение из списка.

Используется для присвоения переменным значений по умолчанию:

// будет height=100, если переменная height равна null или undefined
height = height ?? 100;
Оператор ?? имеет очень низкий приоритет, лишь немного выше, чем у ? и =, поэтому при использовании его в выражении, скорее всего, потребуются скобки.

Запрещено использовать вместе с || или && без явно указанных круглых скобок.


Мы рассмотрели 3 вида циклов:

while – Проверяет условие перед каждой итерацией.
do..while – Проверяет условие после каждой итерации.
for (;;) – Проверяет условие перед каждой итерацией, есть возможность задать дополнительные настройки.
Чтобы организовать бесконечный цикл, используют конструкцию while (true). При этом он, как и любой другой цикл, может быть прерван директивой break.

Если на данной итерации цикла делать больше ничего не надо, но полностью прекращать цикл не следует – используют директиву continue.

Обе этих директивы поддерживают метки, которые ставятся перед циклом. Метки – единственный способ для break/continue выйти за пределы текущего цикла, повлиять на выполнение внешнего. 
(метки https://learn.javascript.ru/while-for)

Заметим, что метки не позволяют прыгнуть в произвольное место кода, в JavaScript нет такой возможности.

Babel – это транспилер. Он переписывает современный JavaScript-код в предыдущий стандарт.

Термин «полифил» означает, что скрипт «заполняет» пробелы и добавляет современные функции.

Два интересных хранилища полифилов:

core js поддерживает много функций, можно подключать только нужные.
polyfill.io – сервис, который автоматически создаёт скрипт с полифилом в зависимости от необходимых функций и браузера пользователя


Объекты – это ассоциативные массивы с рядом дополнительных возможностей.

Они хранят свойства (пары ключ-значение), где:

Ключи свойств должны быть строками или символами (обычно строками).
Значения могут быть любого типа.
Чтобы получить доступ к свойству, мы можем использовать:

Запись через точку: obj.property.
Квадратные скобки obj["property"]. Квадратные скобки позволяют взять ключ из переменной, например, obj[varWithKey].
Дополнительные операторы:

Удаление свойства: delete obj.prop.
Проверка существования свойства: "key" in obj.
Перебор свойств объекта: цикл for for (let key in obj).
То, что мы изучали в этой главе, называется «простым объектом» («plain object») или просто Object.

В JavaScript есть много других типов объектов:

Array для хранения упорядоченных коллекций данных,
Date для хранения информации о дате и времени,
Error для хранения информации об ошибке.
… и так далее.

Основной концепцией управления памятью в JavaScript является принцип достижимости.

1 Существует базовое множество достижимых значений, которые не могут быть удалены.

Например:

Локальные переменные и параметры текущей функции.
Переменные и параметры других функций в текущей цепочке вложенных вызовов.
Глобальные переменные.
(некоторые другие внутренние значения)
Эти значения мы будем называть корнями.

2 Любое другое значение считается достижимым, если оно доступно из корня по ссылке или по цепочке ссылок.

Внутренние алгоритмы
Основной алгоритм сборки мусора – «алгоритм пометок» (англ. «mark-and-sweep»).

Согласно этому алгоритму, сборщик мусора регулярно выполняет следующие шаги:

Сборщик мусора «помечает» (запоминает) все корневые объекты.
Затем он идёт по их ссылкам и помечает все найденные объекты.
Затем он идёт по ссылкам помеченных объектов и помечает объекты, на которые есть ссылка от них. Все объекты запоминаются, чтобы в будущем не посещать один и тот же объект дважды.
…И так далее, пока не будут посещены все ссылки (достижимые от корней).
Все непомеченные объекты удаляются.

Интерпретаторы JavaScript применяют множество оптимизаций, чтобы сборка мусора работала быстрее и не влияла на производительность.

Вот некоторые из оптимизаций:

Сборка по поколениям (Generational collection) – объекты делятся на «новые» и «старые». Многие объекты появляются, выполняют свою задачу и быстро умирают, их можно удалять более агрессивно. Те, которые живут достаточно долго, становятся «старыми» и проверяются реже.
Инкрементальная сборка (Incremental collection) – если объектов много, то обход всех ссылок и пометка достижимых объектов может занять значительное время и привести к видимым задержкам выполнения скрипта. Поэтому интерпретатор пытается организовать сборку мусора поэтапно. Этапы выполняются по отдельности один за другим. Это требует дополнительного учёта для отслеживания изменений между этапами, но зато теперь у нас есть много крошечных задержек вместо одной большой.
Сборка в свободное время (Idle-time collection) – чтобы уменьшить возможное влияние на производительность, сборщик мусора старается работать только во время простоя процессора.

Внутренняя реализация: Ссылочный тип

Для работы вызовов типа user.hi(), JavaScript использует трюк – точка '.' возвращает не саму функцию, а специальное значение «ссылочного типа», называемого Reference Type.

Этот ссылочный тип (Reference Type) является внутренним типом. Мы не можем явно использовать его, но он используется внутри языка.

Значение ссылочного типа – это «триплет»: комбинация из трёх значений (base, name, strict), где:

base – это объект.
name – это имя свойства объекта.
strict – это режим исполнения. Является true, если действует строгий режим (use strict).
Результатом доступа к свойству user.hi является не функция, а значение ссылочного типа. Для user.hi в строгом режиме оно будет таким:

// значение ссылочного типа (Reference Type)
(user, "hi", true)

Когда скобки () применяются к значению ссылочного типа (происходит вызов), то они получают полную информацию об объекте и его методе, и могут поставить правильный this (=user в данном случае, по base).

Ссылочный тип – исключительно внутренний, промежуточный, используемый, чтобы передать информацию от точки . до вызывающих скобок ().

Используя специальное свойство new.target внутри функции, мы можем проверить, вызвана ли функция при помощи оператора new или без него.

Функции-конструкторы или просто конструкторы являются обычными функциями, именовать которые следует с заглавной буквы.
Конструкторы следует вызывать при помощи оператора new. Такой вызов создаёт пустой this в начале выполнения и возвращает заполненный в конце.

В случае, если функция вызвана при помощи new, то в new.target будет сама функция, в противном случае undefined.

Синтаксис опциональной цепочки ?. имеет три формы:

obj?.prop – возвращает obj.prop, если существует obj, и undefined в противном случае.
obj?.[prop] – возвращает obj[prop], если существует obj, и undefined в противном случае.
obj.method?.() – вызывает obj.method(), если существует obj.method, в противном случае возвращает undefined.
Как мы видим, все они просты и понятны в использовании. ?. проверяет левую часть выражения на равенство null/undefined, и продолжает дальнейшее вычисление, только если это не так.

Цепочка ?. позволяет без возникновения ошибок обратиться к вложенным свойствам.

Символ (symbol) – примитивный тип данных, использующийся для создания уникальных идентификаторов.

Символы создаются вызовом функции Symbol(), в которую можно передать описание (имя) символа.

Даже если символы имеют одно и то же имя, это – разные символы. Если мы хотим, чтобы одноимённые символы были равны, то следует использовать глобальный реестр: вызов Symbol.for(key) возвращает (или создаёт) глобальный символ с key в качестве имени. Многократные вызовы команды Symbol.for с одним и тем же аргументом возвращают один и тот же символ.

Символы имеют два основных варианта использования:

«Скрытые» свойства объектов. Если мы хотим добавить свойство в объект, который «принадлежит» другому скрипту или библиотеке, мы можем создать символ и использовать его в качестве ключа. Символьное свойство не появится в for..in, так что оно не будет нечаянно обработано вместе с другими. Также оно не будет модифицировано прямым обращением, так как другой скрипт не знает о нашем символе. Таким образом, свойство будет защищено от случайной перезаписи или использования.

Так что, используя символьные свойства, мы можем спрятать что-то нужное нам, но что другие видеть не должны.

Существует множество системных символов, используемых внутри JavaScript, доступных как Symbol.*. Мы можем использовать их, чтобы изменять встроенное поведение ряда объектов. Например, в дальнейших главах мы будем использовать Symbol.iterator для итераторов, Symbol.toPrimitive для настройки преобразования объектов в примитивы и так далее.

Технически символы скрыты не на 100%. Существует встроенный метод Object.getOwnPropertySymbols(obj) – с его помощью можно получить все свойства объекта с ключами-символами. Также существует метод Reflect.ownKeys(obj), который возвращает все ключи объекта, включая символьные. Так что они не совсем спрятаны. Но большинство библиотек, встроенных методов и синтаксических конструкций не используют эти методы.

Преобразование объектов в примитивы вызывается автоматически многими встроенными функциями и операторами, которые ожидают примитив в качестве аргумента.

Существует всего 3 типа преобразований (хинтов):

"string" (для alert и других операций, которым нужна строка)
"number" (для математических операций)
"default" (для некоторых операций)
В спецификации явно указано, какой хинт должен использовать каждый оператор. И существует совсем немного операторов, которые не знают, что ожидать, и используют хинт со значением "default". Обычно для встроенных объектов хинт "default" обрабатывается так же, как "number". Таким образом, последние два очень часто объединяют вместе.

Алгоритм преобразований к примитивам следующий:

Сначала вызывается метод obj[Symbol.toPrimitive](hint), если он существует.
Иначе, если хинт равен "string"
происходит попытка вызвать obj.toString(), затем obj.valueOf(), смотря что есть.
Иначе, если хинт равен "number" или "default"
происходит попытка вызвать obj.valueOf(), затем obj.toString(), смотря что есть.