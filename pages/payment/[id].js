import axios from "axios";
import Script from "next/script";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();

  const makePayment = useCallback(async () => {
    const val = {
      id: router.query?.id,
    };
    const { data } = await axios.post(`/api/razorpay`, val);

    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "YASH",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank You for Your Purchase!",
      handler: function (response) {
        alert("Payment successful!");
      },
      prefill: {
        name: "Yash",
        email: "yash@gmail.com",
        contact: "9510580470",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  }, [router.query?.id]); 

  useEffect(() => {
    if (router.query?.id) {
      makePayment();
    }
  }, [makePayment, router.query?.id]); 

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    </>
  );
};

export default Payment;
