# jest-fake-timers-issue

У fakeTimers в jest есть 2 имплементации, старая, которая в моем кейсе не подходит (она не подменяет Date в тестах, подробнее тут https://jestjs.io/docs/jest-object#fake-timers) и новая @sinonjs/fake-timers.

Логика выбора имплементации тут https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-runtime/src/index.ts#L2194 в зависимости от переданной опции выбирается старая и новая. Новая лежит в environment.fakeTimersModern (это важно).


Теперь разматываю клубок:

jest сначала запускает cli, проходит через несколько пакетов своих и доходит до jest-config, это пакет который парсит конфиг и нормализует его. Нас интересует тут как он парсит test-environment - тут https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-config/src/normalize.ts#L527. 

Чтобы зарезолвить окружение, jest берет значени из конфига и добавляя к нему jest-environment- (https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-resolve/src/utils.ts#L92) - вызывает resolver.findNodeModule(jest-environment-(node | jsdom)) Тут и кроется вся проблема, у меня в пакете jest 29.7.0, jest-environment-node резолвится 25.5.0. В 25.5.0 вместо fakeTimersModern (упоминал в самом начала) лежит поле fakeTimersLolex (https://github.com/jestjs/jest/blob/v25.5.0/packages/jest-environment-node/src/index.ts#L94) для резолва используется пакет https://www.npmjs.com/package/resolve в него пока не стал лезть

Вообщем все закончилось тем, что есть проблема с резолвом пакетов в монорепе, по какой логике этот пакет https://www.npmjs.com/package/resolve выбирает какую версию зарезолвить - не стал выяснять. Решение: поставить в проект jest-environment-node нужной версии и поитогу она и зарезолвится
