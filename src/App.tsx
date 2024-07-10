import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// componentes
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage/>
  },{
    path: "/trips/:tripId",
    element: <TripDetailsPage/>
  }
]);


export function App() {
  return (
    <RouterProvider router={router} />
  )
}
