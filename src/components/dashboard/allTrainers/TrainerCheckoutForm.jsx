import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TrainerCheckoutForm = ({ paymentInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [loadingButton, setLoadingButton] = useState(false);

    const [err, setErr] = useState("");
    const [transitionId, setTransitionId] = useState("");

    const { user } = useContext(AuthContext);
    console.log(user);
    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.getMonth() + 1;
    // let yyyy = today.getFullYear();
    // const paymentDate = `${mm}-${dd}-${yyyy}`;

    const { _id } = paymentInfo;

    const [clientSecret, setClientSecret] = useState("");
    console.log(clientSecret);
    const packageCost = 50;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads

        if (packageCost > 0) {
            fetch(
                "https://fitness-tracker-server.vercel.app/api/create-payment-intent",

                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ packageCost }),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    setClientSecret(data.clientSecret);
                    console.log(data);
                });
        }
    }, [packageCost]);

    const handleSubmit = async (e) => {
        setLoadingButton(true);
        e.preventDefault();
        if (!stripe || !elements) {
            setLoadingButton(false);
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            setLoadingButton(false);
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
            setLoadingButton(false);
            console.log("[error]", error);
        } else {
            setErr("");
            console.log("[PaymentMethod]", paymentMethod);
            if (paymentIntent.status === "succeeded") {
                setTransitionId(paymentIntent.id);

                setLoadingButton(false);
                axiosPublic
                    .put(`/trainers/${_id}`)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

        if (confirmError) {
            setLoadingButton(false);
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
                {loadingButton ? (
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <span>Pay</span>
                )}
            </button>
            <p className="text-red-600 text-xs mt-6">{err}</p>
            {transitionId && (
                <p className="text-green-400 text-xs mt-6">
                    <span className="text-white"> Your transition Id:</span>{" "}
                    {transitionId}
                </p>
            )}
        </form>
    );
};
export default TrainerCheckoutForm;

TrainerCheckoutForm.propTypes = {
    paymentInfo: PropTypes.object,
};
