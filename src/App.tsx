import * as React from "react";
import { ChakraProvider } from '@chakra-ui/react';
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";

export const App = () => (
 <div>



<ChakraProvider>
<BrowserRouter>
<Routing/>
</BrowserRouter>
</ChakraProvider>

 </div>
)
