import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../context/shoppingCartContext';
import CartItem from '../CartItem';
import Layout from '../layout/Layout';

function CartPage() {
    const {
        shoppingCart, removeFromCart, emptyCart,
    } = useShoppingCart();

    return (
        <Layout>
            <Box
                width={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={6}
            />
            {shoppingCart.map((cartItem) => (
                <Box mb={3} key={cartItem.id}>
                    <CartItem cartItem={cartItem} removeFromCart={removeFromCart} />
                </Box>
            ))}
            <Box mt={5}>
                <Box mb={3}>
                    <Button fullWidth variant="contained">Checkout</Button>
                </Box>
                <Box mb={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={emptyCart}
                    >
                        Empty Cart
                    </Button>
                </Box>
                <Box mb={3}>
                    <Link to="/">
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<HomeIcon />}
                        >
                            Home
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Layout>
    );
}

export default CartPage;