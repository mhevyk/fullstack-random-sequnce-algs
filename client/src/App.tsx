import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, Tab, Tabs } from "react-bootstrap";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="mt-4">
        <Tabs defaultActiveKey="config" className="mb-3">
          <Tab eventKey="config" title="FIPS-186"></Tab>
          {/* TODO: complete tabs */}
        </Tabs>
      </Container>
    </QueryClientProvider>
  );
}
