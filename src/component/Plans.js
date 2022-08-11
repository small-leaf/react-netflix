import { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const PlansContainer = styled.div``

const Plan = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  opacity: .8;

  &:hover {
    opacity: 1;
  }
`

const PlanInfo = styled.div``

const ProductName = styled.h5``

const ProductDes = styled.h6``

const SubscribeButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #e50914;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &.currentPackage {
    background-color: gray;
  }
`

const RenewalDate = styled.p``

function Plans() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async subscription => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          })
        })
      })
  }, [user])

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then(querySnapshot => {
        const products = {};
        querySnapshot.forEach(async productDoc => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').get();
          priceSnap.docs.forEach(price => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data()
            };
          });
        });
        setProducts(products);
      })
  }, [])

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

      docRef.onSnapshot(async (snap) => {
        const { error, sessionId } = snap.data();

        if (error) {
          alert(`An error occured: ${error.message}`);
        }

        if (sessionId) {
          const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`);
          stripe.redirectToCheckout({ sessionId });
        }
      })
  }

  return (
    <PlansContainer>
      <br />
      {subscription && (
        <RenewalDate>
          Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
        </RenewalDate>
      )}
      {
        Object.entries(products).map(([productId, productData]) => {
          const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)

          return (
            <Plan key={productId}>
              <PlanInfo>
                <ProductName>{productData.name}</ProductName>
                <ProductDes>{productData.description}</ProductDes>
              </PlanInfo>
              <SubscribeButton
                className={isCurrentPackage && 'currentPackage'}
                onClick={() => {
                  !isCurrentPackage && loadCheckout(productData.prices.priceId)
                }}
              >
                {isCurrentPackage ? 'Current Package' : 'Subscribe'}
              </SubscribeButton>
            </Plan> 
          )
        })
      }
    </PlansContainer>
  )
}

export default Plans