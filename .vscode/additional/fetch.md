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

