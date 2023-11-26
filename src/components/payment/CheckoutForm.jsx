import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [err, setErr] = useState("");
    const [transitionId, setTransitionId] = useState("");

    // test
    const price = 500;
    const user = {
        email: "smd71430@gmail.com",
        name: "admin",
    };

    const [clientSecret, setClientSecret] = useState("");
    console.log(clientSecret);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads

        if (price > 0) {
            fetch(
                "http://localhost:5000/create-payment-intent",

                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ price }),
                }
            )
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        // confirm payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email,
                        name: user.name,
                    },
                },
            });

        if (error) {
            setErr(error.message);
            console.log("[error]", error);
        } else {
            setErr("");
            console.log("[PaymentMethod]", paymentMethod);
            if (paymentIntent.status === "succeeded") {
                console.log("object");
                setTransitionId(paymentIntent.id);
            }
        }

        if (confirmError) {
            console.log("confirm error", confirmError);
        } else {
            console.log("payment intent ", paymentIntent);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="p-10 rounded-lg border-2">
            <CardElement
                className="border p-4 rounded-md bg-white"
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                className="w-full bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black py-2 rounded-md mt-5"
                type="submit"
                disabled={!stripe || !elements}
            >
                Pay
            </button>
            <p className="text-red-600 text-xs">{err}</p>
            <p className="text-green-600 text-xs">{transitionId}</p>
        </form>
    );
};

export default CheckoutForm;
