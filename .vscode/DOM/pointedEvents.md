События указателя позволяют одновременно обрабатывать действия с помощью мыши, касания и пера, в едином фрагменте кода.

События указателя расширяют события мыши. Мы можем заменить mouse на pointer в названиях событий и код продолжит работать для мыши, при этом получив лучшую поддержку других типов устройств.

При обработке переносов и сложных касаний, которые браузер может попытаться обработать сам, не забывайте отменять действие браузера и ставить touch-events: none в CSS для элементов, с которыми мы взаимодействуем.

Дополнительные возможности событий указателя:

Поддержка мультитач с помощью pointerId и isPrimary.
Особые свойства для определённых устройств, такие как pressure, width/height и другие.
Захват указателя: мы можем перенаправить все события указателя на определённый элемент до наступления события pointerup/pointercancel.