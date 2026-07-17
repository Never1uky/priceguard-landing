import { SITE } from '../site'

export function OfferPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Публичная оферта</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Договор оказания услуг по предоставлению доступа к Premium-подписке {SITE.productName}
      </p>

      <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">1. Общие положения</h2>
          <p className="mt-2">
            1.1. Настоящий документ является официальным предложением (публичной офертой){' '}
            {SITE.legal.fullName} (ИНН {SITE.legal.inn}) (далее — «Исполнитель») заключить договор
            с любым физическим лицом (далее — «Заказчик») на условиях, изложенных ниже.
          </p>
          <p className="mt-2">
            1.2. Акцептом оферты является оплата выбранного тарифа Premium через платёжный сервис
            ЮKassa и/или активация лицензионного ключа в расширении {SITE.productName}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">2. Предмет договора</h2>
          <p className="mt-2">
            2.1. Исполнитель предоставляет Заказчику доступ к цифровому сервису — Premium-функциям
            Chrome-расширения {SITE.productName} (сравнение цен, AI-анализ, расширенное
            отслеживание и связанные возможности, доступные по тарифу Premium) на оплаченный срок.
          </p>
          <p className="mt-2">
            2.2. Услуга является цифровым доступом к ПО; материальный товар не передаётся.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">3. Стоимость и оплата</h2>
          <p className="mt-2">
            3.1. Стоимость подписки: {SITE.pricing.monthlyRub} ₽ за 1 месяц или{' '}
            {SITE.pricing.yearlyRub} ₽ за 1 год (актуальные цены указаны на сайте и в интерфейсе
            расширения).
          </p>
          <p className="mt-2">
            3.2. Оплата производится банковской картой через платёжного партнёра ЮKassa. После
            успешной оплаты Заказчик получает лицензионный ключ или автоматическую активацию
            Premium.
          </p>
          <p className="mt-2">
            3.3. Момент оказания услуги — момент активации Premium-доступа в расширении Заказчика.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">4. Что получает Заказчик</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>доступ к Premium на оплаченный срок;</li>
            <li>неограниченный (в рамках тарифа Premium) AI-анализ;</li>
            <li>расширенные лимиты сравнения и отслеживания товаров;</li>
            <li>поддержку по вопросам активации ключа (email / Telegram).</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">5. Возврат</h2>
          <p className="mt-2">
            5.1. Заказчик вправе обратиться за возвратом, если Premium не был активирован по вине
            Исполнителя или доступ технически невозможен и неисправность не устранена в разумный
            срок после обращения.
          </p>
          <p className="mt-2">
            5.2. Заявление о возврате направляется на {SITE.legal.email} с указанием email оплаты,
            даты платежа и описания проблемы. Решение принимается в срок до 10 рабочих дней.
          </p>
          <p className="mt-2">
            5.3. Если услуга уже оказана (доступ активирован и использован), возврат денежных
            средств за оплаченный период может быть отказан в случаях, предусмотренных законом о
            защите прав потребителей для цифрового контента и надлежаще оказанных услуг.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">6. Ответственность</h2>
          <p className="mt-2">
            6.1. Исполнитель не гарантирует точность цен и наличия товаров на маркетплейсах —
            данные зависят от сайтов-источников и могут меняться.
          </p>
          <p className="mt-2">
            6.2. AI-анализ носит информационный характер и не является финансовой или юридической
            консультацией.
          </p>
          <p className="mt-2">
            6.3. Стороны освобождаются от ответственности за неисполнение обязательств вследствие
            обстоятельств непреодолимой силы.
          </p>
          <p className="mt-2">
            6.4. Ответственность Исполнителя ограничивается суммой фактически уплаченной Заказчиком
            за соответствующий период подписки, кроме случаев, прямо установленных законом.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">7. Контакты Исполнителя</h2>
          <ul className="mt-2 space-y-1">
            <li>ФИО: {SITE.legal.fullName}</li>
            <li>Статус: {SITE.legal.status}</li>
            <li>ИНН: {SITE.legal.inn}</li>
            <li>
              Email:{' '}
              <a className="text-mint" href={`mailto:${SITE.legal.email}`}>
                {SITE.legal.email}
              </a>
            </li>
            <li>Telegram: {SITE.legal.telegram}</li>
          </ul>
        </section>

        <p className="text-xs text-ink-soft/80">
          Редакция оферты от {new Date().toLocaleDateString('ru-RU')}. Актуальная версия всегда
          доступна на этой странице.
        </p>
      </div>
    </article>
  )
}
