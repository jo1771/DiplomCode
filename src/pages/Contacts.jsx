import React from 'react'

const Contacts = () => {
    return (
        <>
            <div class="contacts container">
                <div class="contacts-header">
                    <h1>Контакты</h1>
                    <p>Свяжитесь с нами любым удобным способом.</p>
                </div>
                <div class="contacts-content">
                    <div class="contacts-info">
                        <h2>Наш адрес</h2>
                        <p>12345, Москва, ул. Примерная, д. 1</p>
                    </div>
                    <div class="contacts-info">
                        <h2>Телефон</h2>
                        <p>+7 (495) 123-45-67</p>
                    </div>
                    <div class="contacts-info">
                        <h2>Email</h2>
                        <p>info@nike.com</p>
                    </div>
                </div>
                <div class="contacts-footer">
                    <p>Мы всегда рады помочь. Не стесняйтесь обращаться!</p>
                </div>
            </div>
        </>
    )
}

export default Contacts