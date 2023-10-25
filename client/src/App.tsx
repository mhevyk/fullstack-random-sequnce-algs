import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, Tab, Tabs } from "react-bootstrap";
import { AlgorithmWalkthrough } from "./pages/AlgorithmWalkthrough";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="mt-4">
        <Tabs defaultActiveKey="algorithm-walkthrough" className="mb-3">
          <Tab eventKey="algorithm-walkthrough" title="Виконання алгоритму">
            <AlgorithmWalkthrough />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
        </Tabs>
      </Container>
    </QueryClientProvider>
  );
}
