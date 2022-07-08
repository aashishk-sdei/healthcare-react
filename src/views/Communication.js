import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button,Container } from "shards-react";
import PageHeader from '../components/common/PageHeader/PageHeader';
import { TextBox, EmailBox, SelectBox } from '../components/common/FormsInput';
import { Editor } from 'react-draft-wysiwyg';

import PageTitle from "../components/common/PageTitle";




const Tables = () => (
 
  
  <Container fluid className="main-content-container px-4">
      {
       <div>
          <div>
           <PageHeader buttonLabel='Back' buttonIcon="LeftArrow" className="arrowIconBtn" title="Add Email Template" />
          <Form>
          <Card small className="mb-4" >
          <ListGroup flush>
           <ListGroupItem className="p-3">
              <Row form>
                <Col md="6" className="form-group">
                    <SelectBox Name="Choose language" Placeholder="Select Group Type" />
                </Col>
                <Col md="6" className="form-group">
                    <EmailBox Name="Choose Email Type" Placeholder="Enter Email" />
                </Col>
                <Col md="6" className="form-group">
                   <TextBox Name="Template Name" Placeholder="Enter Template Name" />
                </Col>
                <Col md="6" className="form-group">
                   <TextBox Name="From" Placeholder="From" />
                </Col>
                <Col md="6" className="form-group">
                   <TextBox Name="Subject" Placeholder="Enter Subject" />
                </Col>
                <Col md="6" className="form-group">
                    <SelectBox Name="Insert tag" Placeholder="Enter Insert Tag" />
                </Col>
                <Col md="12" className="form-group">
                <label className="d-block">Content</label>
                <div className="position-relative">
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                  
                </div>
              </Col>
              </Row>
              </ListGroupItem>
              </ListGroup>
              </Card>
          </Form>
        </div>
        <div className="header-dv">
          <div className="modal-body">
              <h2>Mass Email</h2>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Mass Email"></textarea>
              <p className="erro danger">Note: Please enter registered mobile numbers only</p>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Mass SMS"></textarea>
              <p className="erro danger">Note: Please enter registered mobile numbers only</p>
              <div className="formBtns text-right">
                <Button theme="white" className="btn-white">Send</Button>
                <Button theme="accent" className="btn-accent">Close</Button>
              </div>
          </div>
        </div>

        <div className="header-dv mt-3 mb-3">
          <div className="modal-body">
              <h2>Test Email</h2>
              <TextBox Placeholder="Email" />
              
              <div className="formBtns text-right mt-3">
                <Button theme="white" className="btn-white">Send</Button>
                <Button theme="accent" className="btn-accent">Cancel</Button>
              </div>
          </div>
        </div>

        
        
       </div>
        
      }
  </Container>
)
    
export default Tables;
