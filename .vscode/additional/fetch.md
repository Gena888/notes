fetch() 

Базовый синтаксис:

let promise = fetch(url, [options])

url – URL для отправки запроса.
options – дополнительные параметры: метод, заголовки и так далее.

Процесс получения ответа обычно происходит в два этапа.

Во-первых, promise выполняется с объектом встроенного класса Response в качестве результата, как только сервер пришлёт заголовки ответа.
На этом этапе мы можем проверить статус HTTP-запроса и определить, выполнился ли он успешно, а также посмотреть заголовки, но пока без тела ответа.

Параметры ответа:

-response.status – HTTP-код ответа,
-response.ok – true, если статус ответа в диапазоне 200-299.
-response.headers – похожий на Map объект с HTTP-заголовками.

Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.

Response предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:

-response.text() – читает ответ и возвращает как обычный текст,
-response.json() – декодирует ответ в формате JSON,
-response.formData() – возвращает ответ как объект FormData (разберём его в следующей главе),
-response.blob() – возвращает объект как Blob (бинарные данные с типом),
-response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневые бинарные данные)

помимо этого, response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям.

Типичный запрос с помощью fetch состоит из двух операторов await:

let response = await fetch(url, options); // завершается с заголовками ответа
let result = await response.json(); // читать тело ответа в формате JSON

Или, без await:

fetch(url, options)
  .then(response => response.json())
  .then(result => /* обрабатываем результат */)




Опции fetch: 
-method – HTTP-метод,
-headers – объект с запрашиваемыми заголовками (не все заголовки разрешены),
-body – данные для отправки (тело запроса) в виде текста, FormData, BufferSource, Blob или UrlSearchParams.





Заголовки (headers) ответа хранятся в похожем на Map объекте response.headers.

Это не совсем Map, но мы можем использовать такие же методы, как с Map.

Для установки заголовка запроса в fetch мы можем использовать опцию headers. Она содержит объект с исходящими заголовками, например:  

let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});

Есть список запрещённых HTTP-заголовков. Эти заголовки обеспечивают достоверность данных и корректную работу протокола HTTP, поэтому они контролируются исключительно браузером.

-Accept-Charset, Accept-Encoding
-Access-Control-Request-Headers
-Access-Control-Request-Method
-Connection
-Content-Length
-Cookie, Cookie2
-Date
-DNT
-Expect
-Host
-Keep-Alive
-Origin
-Referer
-TE
-Trailer
-Transfer-Encoding
-Upgrade
-Via
-Proxy-*
-Sec-*







про отображение прогресса загрузки


// Шаг 1: начинаем загрузку fetch, получаем поток для чтения
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Шаг 2: получаем длину содержимого ответа
const contentLength = +response.headers.get('Content-Length');

// Шаг 3: считываем данные:
let receivedLength = 0; // количество байт, полученных на данный момент
let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Получено ${receivedLength} из ${contentLength}`)
}

// Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Шаг 5: декодируем Uint8Array обратно в строку
let result = new TextDecoder("utf-8").decode(chunksAll);

// Готово!
let commits = JSON.parse(result);
alert(commits[0].author.login);



Разберёмся, что здесь произошло:

1. Мы обращаемся к fetch как обычно, но вместо вызова response.json() мы получаем доступ к потоку чтения response.body.getReader().

Обратите внимание, что мы не можем использовать одновременно оба эти метода для чтения одного и того же ответа: либо обычный метод response.json(), либо чтение потока response.body.

2. Ещё до чтения потока мы можем вычислить полную длину ответа из заголовка Content-Length.

Он может быть нечитаемым при запросах на другой источник (подробнее в разделе Fetch: запросы на другие сайты) и, в общем-то, серверу необязательно его устанавливать. Тем не менее, обычно длина указана.

3. Вызываем await reader.read() до окончания загрузки.

Всё, что получили, мы складываем по «кусочкам» в массив chunks. Это важно, потому что после того, как ответ получен, мы уже не сможем «перечитать» его, используя response.json() или любой другой способ (попробуйте – будет ошибка).

4. В самом конце у нас типизированный массив – Uint8Array. В нём находятся фрагменты данных. Нам нужно их склеить, чтобы получить строку. К сожалению, для этого нет специального метода, но можно сделать, например, так:

 - Создаём chunksAll = new Uint8Array(receivedLength) – массив того же типа заданной длины.
 - Используем .set(chunk, position) для копирования каждого фрагмента друг за другом в него.
   
5. Наш результат теперь хранится в chunksAll. Это не строка, а байтовый массив.

Чтобы получить именно строку, надо декодировать байты. Встроенный объект TextDecoder как раз этим и занимается. Потом мы можем, если необходимо, преобразовать строку в данные с помощью JSON.parse.

Что если результат нам нужен в бинарном виде вместо строки? Это ещё проще. Замените шаги 4 и 5 на создание единого Blob из всех фрагментов:

let blob = new Blob(chunks);


В итоге у нас есть результат (строки или Blob, смотря что удобно) и отслеживание прогресса получения.

На всякий случай повторимся, что здесь мы рассмотрели, как отслеживать процесс получения данных с сервера, а не их отправки на сервер. Для отслеживания отправки у fetch пока нет способа.




Как мы знаем, метод fetch возвращает промис. А в JavaScript в целом нет понятия «отмены» промиса. Как же прервать запрос fetch?

Для таких целей существует специальный встроенный объект: AbortController, который можно использовать для отмены не только fetch, но и других асинхронных задач.

  Использовать его достаточно просто:

  Шаг 1: создаём контроллер:

let controller = new AbortController();

Контроллер controller – чрезвычайно простой объект.

 - Он имеет единственный метод abort() и единственное свойство signal.
 - При вызове abort():
   1. генерируется событие с именем abort на объекте controller.signal
   2. свойство controller.signal.aborted становится равным true.

Все, кто хочет узнать о вызове abort(), ставят обработчики на controller.signal, чтобы отслеживать его.


    let controller = new AbortController();
    let signal = controller.signal;

    // срабатывает при вызове controller.abort()
    signal.addEventListener('abort', () => alert("отмена!"));

    controller.abort(); // отмена!

    alert(signal.aborted); // true

  Шаг 2: передайте свойство signal опцией в метод fetch:

      let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });

Метод fetch умеет работать с AbortController, он слушает событие abort на signal.

  Шаг 3: чтобы прервать выполнение fetch, вызовите controller.abort():

  controller.abort();

  Вот и всё: fetch получает событие из signal и прерывает запрос.







Нижеследующий список – это все возможные опции для fetch с соответствующими значениями по умолчанию (в комментариях указаны альтернативные значения):

let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource или URLSearchParams
  
  referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer,
  // или URL с текущего источника
  
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  
  mode: "cors", // same-origin, no-cors
  
  credentials: "same-origin", // omit, include
  
  cache: "default", // no-store, reload, no-cache, 
  
  force-cache или only-if-cached
  
  redirect: "follow", // manual, error
  
  integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
  
  keepalive: false, // true
  
  signal: undefined, // AbortController, чтобы прервать запрос
  
  window: window // null
});






