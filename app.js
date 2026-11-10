const products = [
  { category: 'sofas', name: 'Диван «Оливер»', description: 'Мягкие формы и глубокая посадка для уютных вечеров.', price: '49 900 ₽', delivery: 'от 7 до 14 дней', option: 'Ткань', options: ['Рогожка, бежевый', 'Велюр, карамельный', 'Рогожка, серый'], image: 'photo-1555041469-a586c61ea9bc', tag: 'ЛЮБИМЫЙ ВЫБОР' },
  { category: 'sofas', name: 'Диван «Милан»', description: 'Лаконичный силуэт для гостиной в современном стиле.', price: '62 900 ₽', delivery: 'от 10 до 20 дней', option: 'Ткань', options: ['Велюр, молочный', 'Рогожка, песочный', 'Велюр, оливковый'], image: 'photo-1493663284031-b7e3aefcae8e', tag: 'УЮТ КАЖДЫЙ ДЕНЬ' },
  { category: 'beds', name: 'Кровать «Луна»', description: 'Мягкое изголовье и спокойный дизайн для вашего отдыха.', price: '38 900 ₽', delivery: 'от 7 до 14 дней', option: 'Подъёмный механизм', options: ['Без механизма', 'С подъёмным механизмом'], image: 'photo-1505693416388-ac5ce068fe85', tag: 'ДЛЯ СЛАДКИХ СНОВ' },
  { category: 'beds', name: 'Кровать «Норди»', description: 'Уютная основа спальни с выразительным изголовьем.', price: '42 900 ₽', delivery: 'от 10 до 20 дней', option: 'Подъёмный механизм', options: ['Без механизма', 'С подъёмным механизмом'], image: 'photo-1505693314120-0d443867891c', tag: 'СПОКОЙНЫЙ СОН' },
  { category: 'mattresses', name: 'Матрас «Комфорт»', description: 'Удобная поддержка для полноценного отдыха каждую ночь.', price: '18 900 ₽', delivery: 'от 5 до 10 дней', option: 'Размер', options: ['140 × 200 см', '160 × 200 см', '180 × 200 см'], second: ['Жёсткость', 'Средняя', 'Мягкая', 'Высокая'], image: 'photo-1631049307264-da0ec9d70304', tag: 'ДЛЯ ВАШЕГО ОТДЫХА' },
  { category: 'mattresses', name: 'Матрас «Баланс»', description: 'Комфортная поверхность и поддержка для здорового сна.', price: '23 900 ₽', delivery: 'от 5 до 12 дней', option: 'Размер', options: ['140 × 200 см', '160 × 200 см', '180 × 200 см'], second: ['Жёсткость', 'Средняя', 'Мягкая', 'Высокая'], image: 'photo-1616594039964-ae9021a400a0', tag: 'КОМФОРТ В ДЕТАЛЯХ' },
  { category: 'storage', name: 'Комод «Терра»', description: 'Вместительный комод для порядка в красивых деталях.', price: '24 900 ₽', delivery: 'от 7 до 14 дней', option: 'Цвет материала', options: ['Дуб натуральный', 'Белый', 'Орех'], image: 'photo-1583847268964-b28dc8f51f92', tag: 'ПОРЯДОК СТИЛЬНО' },
  { category: 'storage', name: 'Шкаф «Сканди»', description: 'Функциональное хранение в лаконичном исполнении.', price: '39 900 ₽', delivery: 'от 10 до 20 дней', option: 'Цвет материала', options: ['Белый', 'Дуб натуральный', 'Графит'], image: 'photo-1595428774223-ef52624120d2', tag: 'ВСЁ НА СВОИХ МЕСТАХ' },
  { category: 'kitchens', name: 'Кухня «Марсель»', description: 'Тёплая палитра и удобство для ваших кулинарных историй.', price: 'от 129 000 ₽', delivery: 'от 20 до 35 дней', option: 'Цвет фасадов', options: ['Тёплый белый', 'Песочный', 'Оливковый'], image: 'photo-1556912172-45b7abe8b7e1', tag: 'СЕРДЦЕ ВАШЕГО ДОМА' },
  { category: 'kitchens', name: 'Кухня «Вива»', description: 'Современное решение для встреч, завтраков и разговоров.', price: 'от 149 000 ₽', delivery: 'от 20 до 40 дней', option: 'Цвет фасадов', options: ['Бежевый', 'Белый', 'Графит'], image: 'photo-1556911220-bff31c812dba', tag: 'ГОТОВЬТЕ С ЛЮБОВЬЮ' }
];

// Images and catalogue details are illustrative until the store's real assortment is provided.
const names = { all: 'Вся мебель', sofas: 'Диваны', beds: 'Кровати', mattresses: 'Матрасы', storage: 'Корпусная мебель', kitchens: 'Кухни' };
const container = document.querySelector('#products');

function selectMarkup(label, values, id) {
  return `<label for="${id}">${label}</label><select id="${id}">${values.map(value => `<option>${value}</option>`).join('')}</select>`;
}

function showCategory(category) {
  if (!names[category]) category = 'all';
  const visible = products.filter(product => category === 'all' || product.category === category);
  document.querySelector('#catalog-title').firstChild.textContent = `${names[category]} `;
  document.querySelector('#product-count').textContent = `(${visible.length})`;
  document.querySelectorAll('.category').forEach(button => button.classList.toggle('active', button.dataset.category === category));
  container.innerHTML = visible.map((product, index) => `<article class="product">
    <div class="product-image"><img src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=80" alt="${product.name}" loading="lazy"><span>${product.tag}</span></div>
    <div class="product-heading"><div><p class="product-category">${names[product.category]}</p><h3>${product.name}</h3></div><strong>${product.price}</strong></div>
    <p class="product-description">${product.description}</p><p class="delivery">◷ &nbsp; Доставка: ${product.delivery}</p>
    <div class="options">${selectMarkup(product.option, product.options, `option-${index}`)}${product.second ? selectMarkup(product.second[0], product.second.slice(1), `second-${index}`) : ''}</div>
  </article>`).join('');
}

document.querySelectorAll('[data-category]').forEach(control => control.addEventListener('click', () => showCategory(control.dataset.category)));
showCategory('all');
