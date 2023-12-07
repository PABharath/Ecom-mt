import React from 'react';
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop-page">
      <h1>Shop</h1>
      <section className="category">
        <h3>Wedding Collection</h3>
        <p>
          Explore our exquisite wedding collection that caters to your
          special day. From elegant bridal gowns to finely tailored suits,
          we offer a wide range of wedding attire that will make your day
          even more memorable.
        </p>
      </section>
      <section className="category">
        <h3>Casual Wear</h3>
        <p>
          Discover our versatile casual wear collection that blends comfort
          and style. Whether you're looking for trendy t-shirts, relaxed jeans,
          or cozy sweaters, our casual collection has something for every
          casual occasion.
        </p>
      </section>
      <section className="category">
        <h3>Video Shopping</h3>
        <p>
          Experience a new way of shopping with our video shopping feature.
          Our fashion experts are ready to assist you virtually, showcasing
          products and providing personalized styling tips. Connect with us
          for a unique shopping experience.
        </p>
      </section>
    </div>
  );
};

export default Shop;
