    Модуль – это файл. Чтобы работал import/export, нужно для браузеров указывать атрибут <script type="module">. У модулей есть ряд особенностей:

-Отложенное (deferred) выполнение по умолчанию.
-Атрибут async работает во встроенных скриптах.
-Для загрузки внешних модулей с другого источника, он должен ставить -заголовки CORS.
-Дублирующиеся внешние скрипты игнорируются.
   
    У модулей есть своя область видимости, обмениваться функциональностью можно через import/export.
    
    В модулях всегда включена директива use strict.

    Код в модулях выполняется только один раз. Экспортируемая функциональность создаётся один раз и передаётся всем импортёрам.

Когда мы используем модули, каждый модуль реализует свою функциональность и экспортирует её. Затем мы используем import, чтобы напрямую импортировать её туда, куда необходимо. Браузер загружает и анализирует скрипты автоматически.

В реальной жизни часто используется сборщик Webpack, чтобы объединить модули: для производительности и других «плюшек».




Вот все варианты export

Вы можете проверить себя, читая их и вспоминая, что они означают:

Перед объявлением класса/функции/...:
export [default] class/function/variable ...
Отдельный экспорт:
export {x [as y], ...}.
Реэкспорт:
export {x [as y], ...} from "module"
export * from "module" (не реэкспортирует export default).
export {default [as y]} from "module" (реэкспортирует только export default).
Импорт:

Именованные экспорты из модуля:
import {x [as y], ...} from "module"
Импорт по умолчанию:
import x from "module"
import {default as x} from "module"
Всё сразу:
import * as obj from "module"
Только подключить модуль (его код запустится), но не присваивать его переменной:
import "module"
Мы можем поставить import/export в начало или в конец скрипта, это не имеет значения.


На практике импорты, чаще всего, располагаются в начале файла. Но это только для большего удобства.

импорт должен быть на верхнем уровнe



Выражение import(module) загружает модуль и возвращает промис, результатом которого становится объект модуля, содержащий все его экспорты.

Динамический импорт работает в обычных скриптах, он не требует указания script type="module".

Хотя import() и выглядит похоже на вызов функции, на самом деле это специальный синтаксис, так же, как, например, super().

Так что мы не можем скопировать import в другую переменную или вызвать при помощи .call/apply. Это не функция.