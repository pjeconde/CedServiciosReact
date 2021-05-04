import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class DinamicForm extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Baja / Anular baja de comprobantes</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                   
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label for="exampleSelect">Persona (cliente/proveedor)</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label for="exampleSelect">Naturaleza del comprobante:</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Detalle</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Emisión: Desde</label>
                          <Input
                            defaultValue="20201201"
                            placeholder="desde"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Hasta</label>
                          <Input
                            defaultValue="20201218"
                            placeholder="hasta"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label for="exampleSelect">Estado(s) Ventas</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label for="exampleSelect">Estado(s) Compras/ Ventas (tradic.):</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label for="exampleSelect">Tipos Comprobante</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label for="exampleSelect">Ordenar por</label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="secondary" type="submit">
                    Buscar
                  </Button>
                </CardFooter>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default DinamicForm;
