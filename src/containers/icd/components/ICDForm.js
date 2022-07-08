import React, { useState, createRef } from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, Button, FormCheckbox } from "shards-react";
import { TextBox, CheckBox, SelectBox } from '../../../components/common/FormsInput';
import { toast } from "react-toastify";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const ICDForm = ({ title, details, editable = false, submitData, cancel, categories }) => {

  const icdCategoryRef = createRef();

  const [icdCategory, setICDCategoryType] = useState(details ? details['icd_category'] : '');
  const [icd10_code, setICD] = useState(details ? details['icd10_code'] : '');
  const [icd9_code, setICD2] = useState(details ? details['icd9_code'] : '');
  const [descriptioin, setDescription] = useState(details ? details['description'] : '');
  const [errFlag, setErrFlag] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== 'undefined') ? htmlToDraft(details.description.split('"').join("")).contentBlocks : htmlToDraft(""))));

  const [defaultAcuityLevelUpper, setDefaultAcuityLevelUpper] = useState(details ? details['default_acuity_level_upper_limit'] : '');
  const [defaultAcuityLevelLower, setDefaultAcuityLevelLower] = useState(details ? details['default_acuity_level_lower_limit'] : '');
  const [status, setStatus] = useState(details && details['status'] === 2 ? false : true);

  const [cmFlag, setCmFlag] = useState(details ? details['cm_flag'] : false);
  const [ceFlag, setCeFlag] = useState(details ? details['ce_flag'] : false);
  const [lcaFlag, setLcaFlag] = useState(details ? details['lca_flag'] : false);
  const [cmsFlag, setcmsFlag] = useState(details ? details['cms_flag'] : false);
  const [reinsuranceFlag, setReinsuranceFlag] = useState(details ? details['reinsurance_flag'] : false);
  const [communicableDiseaseFlag, setCommunicableDiseaseFlag] = useState(details ? details['communicable_disease_flag'] : false);
  const [qmFlag, setQmFlag] = useState(details ? details['qm_flag'] : false);
  const [lcm, setLcm] = useState(details ? details['lcm'] : false);
  const [diseaseRegistryAco, SetDiseaseRegistryAco] = useState(details ? details['disease_registry_aco'] : false);
  const [cdm, setCdm] = useState(details ? details['cdm'] : false);
  const [mhsa, setMhsa] = useState(details ? details['mhsa'] : false);
  const [communicableDisease, setCommunicableDisease] = useState(details ? details['communicable_disease'] : false);
  const [emergency, setEmergency] = useState(details ? details['emergency'] : false);
  const [sentinelEventsQoc, setSentinelEventsQoc] = useState(details ? details['sentinel_events_qoc'] : false);
  const [cptlca, setCptlca] = useState(details ? details['cpt_lca'] : false);
  const [hcpclca, setHcpclca] = useState(details ? details['hcpc_lca'] : false);
  const [drglca, setDrglca] = useState(details ? details['drg_lca'] : false);
  const [cancerLca, setCancerLca] = useState(details ? details['cancer_lca'] : false);

  const _handleKeypress = () => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    icdCategoryRef.current.props.onChange(icdCategory);
    descriptioin.length <= 11 ? setErrFlag(true) : setErrFlag(false);
    if ((icd10_code === icd9_code) && (icd10_code !== '' || icd9_code !== ''))
      toast.warn("ICD9 and ICD10 code can't be same.");
    else if (icd10_code === '' && icd9_code === '')toast.warn("ICD9 or ICD10 code can't be empty");
    if (icdCategory === '') console.log("Values should not be empty");
    else if (descriptioin.length <= 11) console.log("ICD descriptioin is required.");
    else if ((icd10_code === icd9_code) || (icd10_code === '' && icd9_code === '')) console.log("icd10_code and icdDescription should have more then 4 is required.");
    else {
      let payload = { icd10_code: icd10_code, icd_category: icdCategory, icd9_code: icd9_code, default_acuity_level_lower_limit: defaultAcuityLevelLower, default_acuity_level_upper_limit: defaultAcuityLevelUpper, description: descriptioin, status: status ? 1 : 2, cm_flag: cmFlag, ce_flag: ceFlag, lca_flag: lcaFlag, cms_flag: cmsFlag, reinsurance_flag: reinsuranceFlag, communicable_disease_flag: communicableDiseaseFlag, qm_flag: qmFlag, lcm: lcm, disease_registry_aco: diseaseRegistryAco, cdm: cdm, mhsa: mhsa, communicable_disease: communicableDisease, emergency: emergency, sentinel_events_qoc: sentinelEventsQoc, cpt_lca: cptlca, hcpc_lca: hcpclca, drg_lca: drglca, cancer_lca: cancerLca };
      if (details && details['@rid']) payload = { ...payload, recordId: details['@rid'] };
      submitData(payload);
    };
  }

  const handleChange = (e, fieldName) => {
    if (fieldName === 'cm')
      fieldName === 'cm' && cmFlag ? setCmFlag(false) : setCmFlag(true);
    if (fieldName === 'ce')
      fieldName === 'ce' && ceFlag ? setCeFlag(false) : setCeFlag(true);
    if (fieldName === 'lca')
      fieldName === 'lca' && lcaFlag ? setLcaFlag(false) : setLcaFlag(true);
    if (fieldName === 'cms')
      fieldName === 'cms' && cmsFlag ? setcmsFlag(false) : setcmsFlag(true);
    if (fieldName === 'reinsurance')
      fieldName === 'reinsurance' && reinsuranceFlag ? setReinsuranceFlag(false) : setReinsuranceFlag(true);
    if (fieldName === 'communicableDiseaseFlag')
      fieldName === 'communicableDiseaseFlag' && communicableDiseaseFlag ? setCommunicableDiseaseFlag(false) : setCommunicableDiseaseFlag(true);
    if (fieldName === 'qm')
      fieldName === 'qm' && qmFlag ? setQmFlag(false) : setQmFlag(true);
    if (fieldName === 'lcm')
      fieldName === 'lcm' && lcm ? setLcm(false) : setLcm(true);
    if (fieldName === 'diseaseRegistryAco')
      fieldName === 'diseaseRegistryAco' && diseaseRegistryAco ? SetDiseaseRegistryAco(false) : SetDiseaseRegistryAco(true);
    if (fieldName === 'cdm')
      fieldName === 'cdm' && cdm ? setCdm(false) : setCdm(true);
    if (fieldName === 'mhsa')
      fieldName === 'mhsa' && mhsa ? setMhsa(false) : setMhsa(true);
    if (fieldName === 'communicableDisease')
      fieldName === 'communicableDisease' && communicableDisease ? setCommunicableDisease(false) : setCommunicableDisease(true);
    if (fieldName === 'emergency')
      fieldName === 'emergency' && emergency ? setEmergency(false) : setEmergency(true);
    if (fieldName === 'sentinelEventsQoc')
      fieldName === 'sentinelEventsQoc' && sentinelEventsQoc ? setSentinelEventsQoc(false) : setSentinelEventsQoc(true);
    if (fieldName === 'cptlca')
      fieldName === 'cptlca' && cptlca ? setCptlca(false) : setCptlca(true);
    if (fieldName === 'hcpclca')
      fieldName === 'hcpclca' && hcpclca ? setHcpclca(false) : setHcpclca(true);
    if (fieldName === 'drglca')
      fieldName === 'drglca' && drglca ? setDrglca(false) : setDrglca(true);
    if (fieldName === 'cancerLca')
      fieldName === 'cancerLca' && cancerLca ? setCancerLca(false) : setCancerLca(true);
  }

  const onEditorStateChange = (editorState) => {
    setDescription(
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
    setEditorState(editorState);
    JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent()))).length < 12 ? setErrFlag(true) : setErrFlag(false)
  };

  return (
    <>
      <Card small className="mb-4" >
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    {/* Select */}
                    <Col md="6" className="form-group">
                      <SelectBox Name="ICD Category" Placeholder="ICD Category" val={icdCategory} optVal='_id' isSub='true' optNameChild="en" options={categories} handleVal={(val) => setICDCategoryType(val)} edit={editable} ref={icdCategoryRef} />
                    </Col>
                    {/* ICD 9 Code */}
                    <Col md="6" className="form-group">
                      <TextBox Name="ICD 10 Code" Placeholder="ICD 10 Code" value={icd10_code} handleVal={(val) => setICD(val)} edit={editable} isRequired={false} />
                    </Col>
                    {/* ICD 10 Code */}
                    <Col md="6" className="form-group">
                      <TextBox Name="ICD 9 Code" Placeholder="ICD 9 Code" value={icd9_code} handleVal={(val) => setICD2(val)} edit={editable} isRequired={false} />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Textarea */}
                    <Col md="12" className="form-group">
                      <label className="d-block">ICD Description
                      <span style={{ 'color': '#ff0000' }}>  *</span></label>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName={"wrapperClassName " + (!editable ? "custom-disable-editor" : "")}
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable}
                      />
                      {errFlag && descriptioin .length <= 11 && <div className="invalid-feedback" style={{ 'display': 'block' }}> This field is required.</div>}
                    </Col>
                    {/* Default Acuity Level */}
                    <Col md="6" className="form-group">
                      <TextBox Name="Default Acuity Level (Upper Limit)" Placeholder="Default Acuity Level (Upper Limit)" value={defaultAcuityLevelUpper} handleVal={(val) => setDefaultAcuityLevelUpper(val)} edit={editable} isRequired={false} />
                    </Col>
                    {/* Default Acuity Leve2 */}
                    <Col md="6" className="form-group">
                      <TextBox Name="Default Acuity Level (Lower Limit)" Placeholder="Default Acuity Level (Lower Limit)" value={defaultAcuityLevelLower} handleVal={(val) => setDefaultAcuityLevelLower(val)} edit={editable} isRequired={false} />
                    </Col>
                    {/* Associated Flags */}
                    <Col md="12" className="form-group">
                      <label className="d-block">Associated Flags</label>
                      <Row>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={cmFlag}
                                onChange={e => { handleChange(e, 'cm') }}
                                disabled={editable ? '' : true}
                              >
                                CM
                       </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={ceFlag}
                                onChange={e => { handleChange(e, 'ce') }}
                                disabled={editable ? '' : true}
                              >
                                CE
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={lcaFlag}
                                onChange={e => { handleChange(e, 'lca') }}
                                disabled={editable ? '' : true}
                              >
                                LCA
                      </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={cmsFlag}
                                onChange={e => { handleChange(e, 'cms') }}
                                disabled={editable ? '' : true}
                              >
                                CMS
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={reinsuranceFlag}
                                onChange={e => { handleChange(e, 'reinsurance') }}
                                disabled={editable ? '' : true}
                              >
                                Reinsurance
                      </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={communicableDiseaseFlag}
                                onChange={e => { handleChange(e, 'communicableDiseaseFlag') }}
                                disabled={editable ? '' : true}
                              >
                                Communicable Disease
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={qmFlag}
                                onChange={e => { handleChange(e, 'qm') }}
                                disabled={editable ? '' : true}
                              >
                                QM Flag
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                    {/* Belongs to */}
                    <Col md="12" className="form-group">
                      <label className="d-block">Belongs to</label>
                      {/* <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                        <li>
                          <FormCheckbox
                            checked={lcm}
                            onChange={e => { handleChange(e, 'lcm') }}
                            disabled={editable ? '' : true}
                          >
                            LCM
                       </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={diseaseRegistryAco}
                            onChange={e => { handleChange(e, 'diseaseRegistryAco') }}
                            disabled={editable ? '' : true}
                          >
                            Disease Registry ACO
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={cdm}
                            onChange={e => { handleChange(e, 'cdm') }}
                            disabled={editable ? '' : true}
                          >
                            CDM
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={mhsa}
                            onChange={e => { handleChange(e, 'mhsa') }}
                            disabled={editable ? '' : true}
                          >
                            MH SA
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={communicableDisease}
                            onChange={e => { handleChange(e, 'communicableDisease') }}
                            disabled={editable ? '' : true}
                          >
                            Communicable Disease
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={emergency}
                            onChange={e => { handleChange(e, 'emergency') }}
                            disabled={editable ? '' : true}
                          >
                            Emergency
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={sentinelEventsQoc}
                            onChange={e => { handleChange(e, 'sentinelEventsQoc') }}
                            disabled={editable ? '' : true}
                          >
                            Sentinel Events QOC
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={cptlca}
                            onChange={e => { handleChange(e, 'cptlca') }}
                            disabled={editable ? '' : true}
                          >
                            CPT LCA
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={hcpclca}
                            onChange={e => { handleChange(e, 'hcpclca') }}
                            disabled={editable ? '' : true}
                          >
                            HCPC LCA
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={drglca}
                            onChange={e => { handleChange(e, 'drglca') }}
                            disabled={editable ? '' : true}
                          >
                            DRG LCA
                      </FormCheckbox>
                        </li>
                        <li>
                          <FormCheckbox
                            checked={cancerLca}
                            onChange={e => { handleChange(e, 'cancerLca') }}
                            disabled={editable ? '' : true}
                          >
                            Cancer LCA
                      </FormCheckbox>
                        </li>
                      </ul> */}
                      <Row>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={lcm}
                                onChange={e => { handleChange(e, 'lcm') }}
                                disabled={editable ? '' : true}
                              >
                                LCM
                       </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={diseaseRegistryAco}
                                onChange={e => { handleChange(e, 'diseaseRegistryAco') }}
                                disabled={editable ? '' : true}
                              >
                                Disease Registry ACO
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={cdm}
                                onChange={e => { handleChange(e, 'cdm') }}
                                disabled={editable ? '' : true}
                              >
                                CDM
                      </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={mhsa}
                                onChange={e => { handleChange(e, 'mhsa') }}
                                disabled={editable ? '' : true}
                              >
                                MH SA
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>

                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={communicableDisease}
                                onChange={e => { handleChange(e, 'communicableDisease') }}
                                disabled={editable ? '' : true}
                              >
                                Communicable Disease
                      </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={emergency}
                                onChange={e => { handleChange(e, 'emergency') }}
                                disabled={editable ? '' : true}
                              >
                                Emergency
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={sentinelEventsQoc}
                                onChange={e => { handleChange(e, 'sentinelEventsQoc') }}
                                disabled={editable ? '' : true}
                              >
                                Sentinel Events QOC
                      </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={cptlca}
                                onChange={e => { handleChange(e, 'cptlca') }}
                                disabled={editable ? '' : true}
                              >
                                CPT LCA
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>

                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={hcpclca}
                                onChange={e => { handleChange(e, 'hcpclca') }}
                                disabled={editable ? '' : true}
                              >
                                HCPC LCA
                      </FormCheckbox>
                            </li>
                            <li>
                              <FormCheckbox
                                checked={drglca}
                                onChange={e => { handleChange(e, 'drglca') }}
                                disabled={editable ? '' : true}
                              >
                                DRG LCA
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                        <Col md="6">
                          <ul className="list-unstyled d-flex flex-wrap associatedCheck">
                            <li>
                              <FormCheckbox
                                checked={cancerLca}
                                onChange={e => { handleChange(e, 'cancerLca') }}
                                disabled={editable ? '' : true}
                              >
                                Cancer LCA
                      </FormCheckbox>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                    {/* Status */}
                    <Col md="6" className="form-group">
                      <CheckBox Name="Status" className="withInput" value={status} handleVal={() => setStatus(!status)} edit={editable ? true : false} />
                    </Col>
                  </Row>
                  {/* <FormButtons className="text-right" /> */}
                  <div className='formBtns text-right'>
                    {details ? (editable ? <Button theme="white" onClick={() => cancel()}>Cancel</Button> : '') : <Button theme="white" onClick={() => cancel()}>Cancel</Button>}
                    {details ? (editable ? < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Update</Button> : '') : < Button theme="accent" onClick={() => checkValidationAndSubmit()}>Submit</Button>}
                  </div>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card >
    </>
  );
}

export default ICDForm;
