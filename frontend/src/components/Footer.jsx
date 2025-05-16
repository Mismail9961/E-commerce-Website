import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            minima omnis, veniam iusto odit itaque doloremque quas, vero quia
            alias totam delectus accusantium nostrum quasi aut rem quis.
            Voluptas, omnis! Excepturi necessitatibus, velit at explicabo ab
            aperiam maiores itaque! Odit adipisci molestias ducimus ratione
            nisi, nostrum earum dolor aliquid obcaecati officia eum numquam illo
            asperiores ipsum? Laborum voluptatibus minus molestiae.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+923102437498</li>
            <li>contact@foever</li>
          </ul>
        </div>
      </div>

<div>
  <hr />
  <p className="py-5 text-sm text-center">Copyright 2024@ foever.com - All Right Reserved</p>
</div>

    </div>
  );
};

export default Footer;
