import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export const Cards = () => {
  const list = [
    {
      title: "Orange",
      img: "/images/products/apple.webp",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/products/apple.webp",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/products/pizza.webp",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/products/pancake.webp",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/products/pancake.webp",
      price: "$15.70",
    },
    {
      title: "Lemon 2asdasdas asdas asd asdas dsa d asd",
      img: "/images/products/apple.webp",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/products/fries.webp",
      price: "$7.50",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card className={"bg-light-cream"} shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b className={"text-ellipsis whitespace-nowrap overflow-hidden"}>{item.title}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
