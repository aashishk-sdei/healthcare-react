import React, { useState, createRef } from "react";
import { Card, ListGroup, ListGroupItem, Row, Col, Form, Button, } from "shards-react";
import { Collapse } from "reactstrap";
import { TextBox, CheckBox, SelectBox, } from "../../../components/common/FormsInput";
import Heading3 from "../../../components/common/Heading3/Heading3";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./dragAndDrop/dragAndDrop.scss";
const QuestionnaireForm = ({ details, Language, surveyCategories, questionnaireTypes, diseasesList, questionList, editable = false, submitData, cancel }) => {
  const languageRef = createRef();
  const questionnairetypeRef = createRef();
  const nameRef = createRef();
  const setDiseaseRef = createRef();
  const SurveyCategoryRef = createRef();
  const [language, setLanguage] = useState(details ? details["language"] : Language && Language.length > 0 ? Language[Language.findIndex(e => e.name === 'English')]['@rid'] : '');
  const [questionnairetype, setQuestionnairetype] = useState(
    details ? details["questionnaire_type"] : ""
  );
  const [name, setName] = useState(details ? details["name"] : "");
  const [description, setDescription] = useState(
    details ? details["description"] : ""
  );
  const [disease, setDisease] = useState(details ? details["disease"] : "");
  const [surveyCategory, setSurveyCategory] = useState(
    details ? details["survey_category"] : ""
  );
  const [status, setStatus] = useState(
    details && details["status"] === 2 ? false : true
  );
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray((details && typeof details !== "undefined") ? htmlToDraft(details && details.description.split('"').join("")).contentBlocks : htmlToDraft(""))));
  const newQuestionCategory = [...questionList];
  const [items, setItems] = useState(newQuestionCategory);

  let getSelectedData =
    details && details.assignQuestion
      ? JSON.parse(details.assignQuestion.rawdata)
      : "";
  const [selected, setSelected] = useState(
    getSelectedData ? getSelectedData : []
  );
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  let id2List = {
    droppable: items,
    droppable2: selected,
  };

  const getList = (id) => id2List[id];

  const _handleKeypress = (e) => { checkValidationAndSubmit() }

  const checkValidationAndSubmit = () => {
    languageRef.current.props.onChange(language);

    questionnairetypeRef.current.props.onChange(questionnairetype);
    nameRef.current.props.onChange(name);
    setDiseaseRef.current.props.onChange(disease);
    if (questionnairetype == "#115:0" || questionnairetype == "#179:0")
      SurveyCategoryRef.current.props.onChange(surveyCategory);

    if (language === "") console.log("Values should not be empty");
    else if (language.length <= 1)
      console.log(
        "question and icdDescription should have more then 4 is required."
      );
    else {
      let payload = {
        name: name,
        description: description,
        disease: disease,
        selected_question: JSON.stringify(selected),
        survey_category:
          questionnairetype == "#115:0" || questionnairetype == "#179:0"
            ? surveyCategory
            : "",
        language: language,
        questionnaire_type: questionnairetype,
        status: status ? 1 : 2,
      };
      if (details && details["@rid"])
        payload = { ...payload, recordId: details["@rid"] };
      submitData(payload);
    }
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(
      JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
  };

  const returner = (list) => Array.from(list);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const parseData = (data) => JSON.parse(JSON.stringify(data));

  const isCatIndex = (id) =>
    selected.findIndex((e) => e["@rid"] === id) !== -1 ? true : false;
  const isChildCatIndex = (id) => {
    let childInex = -1;
    for (var i = 0; i < selected.length; i++) {
      if (childInex !== -1) return childInex;
      childInex = selected[i].children.findIndex((e) => e["@rid"] === id);
    }
    return childInex;
  };

  const isQuestionIndex = (id) => {
    let childInex = -1;
    for (var i = 0; i < selected.length; i++) {
      if (childInex === 1) return false;
      childInex = selected[i].children.findIndex((e) => e["@rid"] === id);
    }
    return childInex;
  };

  const _selectQuestion = (
    parentCatId,
    questId,
    catId,
    mainCatIndx = "",
    childIndx = "",
    questIndx = ""
  ) => {
    if (!editable) return false;
    let newArr = selected;
    let parseItems = parseData(items);
    try {
      if (newArr.findIndex((e) => e["@rid"] === catId) === -1) {
        if (newArr.length > 0) {
          setItems([...newQuestionCategory]);
          if (
            isCatIndex(parentCatId) &&
            isChildCatIndex(catId) === -1 &&
            catId !== ""
          ) {
            let prntIdx = newArr.findIndex((e) => e["@rid"] === parentCatId);
            newArr[prntIdx].children.push(
              parseItems[mainCatIndx].children[childIndx]
            );
            let childInd = newArr[prntIdx].children.findIndex(
              (e) => e["@rid"] === catId
            );
            newArr[prntIdx].children[childInd].questions = [];
            if (
              newArr[prntIdx].children[childInd].questions.findIndex(
                (e) => e["@rid"] === questId
              ) === -1
            ) {
              newArr[prntIdx].children[childInd].questions.push(
                newQuestionCategory[mainCatIndx].children[childIndx].questions[
                questIndx
                ]
              );
            }
            setSelected([...newArr]);
          } else if (!isCatIndex(parentCatId) && catId !== "") {
            newArr.push(parseItems[mainCatIndx]);
            let prntIdx = newArr.findIndex((e) => e["@rid"] === parentCatId);
            newArr[prntIdx].questions = [];
            newArr[prntIdx].children = [
              parseItems[mainCatIndx].children[childIndx],
            ];
            let childInd = newArr[prntIdx].children.findIndex(
              (e) => e["@rid"] === catId
            );
            newArr[prntIdx].children[childInd].questions = [
              parseItems[mainCatIndx].children[childIndx].questions[questIndx],
            ];
            setSelected([...newArr]);
            setItems([...newQuestionCategory]);
          } else if (isCatIndex(parentCatId) && catId === "") {
            let prntIdx = newArr.findIndex((e) => e["@rid"] === parentCatId);
            if (
              newArr[prntIdx].questions &&
              newArr[prntIdx].questions.findIndex(
                (e) => e["@rid"] === questId
              ) === -1
            ) {
              newArr[prntIdx].questions.push(
                parseItems[mainCatIndx].questions[questIndx]
              );
            } else if (!newArr[prntIdx].questions) {
              newArr[prntIdx].questions = [];
              newArr[prntIdx].questions.push(
                parseItems[mainCatIndx].questions[questIndx]
              );
            }
            setSelected([...newArr]);
          } else if (!isCatIndex(parentCatId) && catId !== "") {
            newArr.push(parseItems[mainCatIndx]);
            let prntIdx = newArr.findIndex((e) => e["@rid"] === parentCatId);
            newArr[prntIdx].children = [
              parseItems[mainCatIndx].children[childIndx],
            ];
            let childInd = newArr[prntIdx].children.findIndex(
              (e) => e["@rid"] === catId
            );
            newArr[prntIdx].children[childInd].questions = [
              parseItems[mainCatIndx].children[childIndx].questions[questIndx],
            ];
            setSelected([...newArr]);
            setItems([...newQuestionCategory]);
          } else if (isCatIndex(parentCatId) && isChildCatIndex(catId) !== -1) {
            let childIndx = isQuestionIndex(catId);
            let prntIdx = newArr.findIndex((e) => e["@rid"] === parentCatId);

            if (
              newArr[prntIdx].children[childIndx].questions.findIndex(
                (e) => e["@rid"] === questId
              ) === -1
            )
              newArr[prntIdx].children[childIndx].questions.push(
                parseItems[mainCatIndx].children[childIndx].questions[questIndx]
              );
            setItems([...newQuestionCategory]);
            setSelected([...newArr]);
          } else if (!isCatIndex(parentCatId)) {
            newArr.push(parseItems[mainCatIndx]);
            let pinx = newArr.findIndex((e) => e["@rid"] === parentCatId);
            newArr[pinx].children = [];
            newArr[pinx].questions = [];
            newArr[pinx].questions.push(
              newQuestionCategory[mainCatIndx].questions[questIndx]
            );
            setSelected([...newArr]);
          }
        } else if (catId) {
          let parent = parseItems[mainCatIndx];
          parent.questions = [];
          parent.children = [parseItems[mainCatIndx].children[childIndx]];
          let qstnIndx = parent.children[0].questions.findIndex((e) => e["@rid"] === questId)
          parent.children[0].questions = [
            parseItems[mainCatIndx].children[childIndx].questions[qstnIndx],
          ];
          newArr.push(parent);
          setSelected([...newArr]);
          setItems(newQuestionCategory);
        } else {
          let parent = parseItems[mainCatIndx];
          parent.children = [];
          parent.questions = [];
          parent.questions.push(
            newQuestionCategory[mainCatIndx].questions[questIndx]
          );
          newArr.push(parent);
          setSelected([...newArr]);
        }
        setItems(newQuestionCategory);
      }
    } catch (err) { }
  };
  const getItemStyle = (color_hex) => ({
    // some basic styles to make the items look a bit nicer

    // change background colour if dragging
    background: color_hex,
    padding: "10px",
  });
  const getItemStyleFor = (isDragging, draggableStyle, color_hex) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? color_hex : color_hex,

    backgroundColor: color_hex,
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#fff" : "#fff",
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items1 = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "droppable2") {
        setSelected(items1);
      } else {
        // setItems(items1);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setItems(result.droppable);
      setSelected(result.droppable2);
    }
  };

  const [tabToggle, settabToggle] = useState(null);
  const [tabToggle2, settabToggle2] = useState(null);
  const [tabToggle3, settabToggle3] = useState(null);
  const [tabTogglel, settabTogglel] = useState(null);
  const [tabTogglel2, settabTogglel2] = useState(null);
  const [tabTogglel3, settabTogglel3] = useState(null);

  const toggle = (index) => {
    if (tabToggle === index) {
      settabToggle(null);
    } else if (tabToggle !== index) {
      settabToggle(index);
      console.log(tabToggle === index);
    }
  };
  const toggle2 = (index) => {
    if (tabToggle2 === index) {
      settabToggle2(null);
    } else if (tabToggle2 !== index) {
      settabToggle2(index);
      console.log(tabToggle2 === index);
    }
  };

  const toggle3 = (index) => {
    if (tabToggle3 === index) {
      settabToggle3(null);
    } else if (tabToggle3 !== index) {
      settabToggle3(index);
      console.log(tabToggle3 === index);
    }
  };

  const togglel = (index) => {
    if (tabTogglel === index) {
      settabTogglel(null);
    } else if (tabTogglel !== index) {
      settabTogglel(index);
      console.log(tabTogglel === index);
    }
  };
  const togglel2 = (index) => {
    if (tabTogglel2 === index) {
      settabTogglel2(null);
    } else if (tabTogglel2 !== index) {
      settabTogglel2(index);
      console.log(tabTogglel2 === index);
    }
  };

  const togglel3 = (index) => {
    if (tabToggle3 === index) {
      settabTogglel3(null);
    } else if (tabTogglel3 !== index) {
      settabTogglel3(index);
      console.log(tabTogglel3 === index);
    }
  };

  const _removeSelectedItems = (sIndex, cIndex, QIndex, dIndex) => {
    if (!editable) return false;
    let selectedItems = JSON.parse(JSON.stringify(selected));
    if (cIndex === "" && dIndex === "") {
      selectedItems[sIndex].questions.splice(QIndex, 1);
      if (
        selectedItems[sIndex].children.length == 0 &&
        selectedItems[sIndex].questions.length == 0
      )
        selectedItems.splice(sIndex, 1);
    } else if (cIndex === "")
      selectedItems[sIndex].questions[QIndex].dependencyQuestions.splice(
        dIndex,
        1
      );
    else if (cIndex !== "" && dIndex === "") {
      selectedItems[sIndex].children[cIndex].questions.splice(QIndex, 1);
      if (selectedItems[sIndex].children[cIndex].questions.length == 0)
        selectedItems[sIndex].children.splice(cIndex, 1);
      if (
        selectedItems[sIndex].children.length == 0 &&
        selectedItems[sIndex].questions &&
        selectedItems[sIndex].questions.length == 0
      )
        selectedItems.splice(sIndex, 1);
    } else {
      selectedItems[sIndex].children[cIndex].questions[
        QIndex
      ].dependencyQuestions.splice(dIndex, 1);
    }
    setSelected([...selectedItems]);
    // debugger;
  };

  return (
    <>
      <Card small className="mb-4">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <SelectBox
                        Name="Language"
                        Placeholder="Select Language"
                        val={language}
                        options={Language}
                        handleVal={(val) => setLanguage(val)}
                        edit={editable}
                        ref={languageRef}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox
                        Name="Questionnaire Type"
                        Placeholder="Questionnaire Type"
                        val={questionnairetype}
                        optName="name"
                        options={questionnaireTypes}
                        handleVal={(val) => setQuestionnairetype(val)}
                        edit={editable}
                        ref={questionnairetypeRef}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <TextBox
                        Name="Questionnaire Name"
                        Placeholder="Questionnaire Name"
                        min={1}
                        value={name}
                        handleVal={(val) =>
                          setName(val.replace(/\s+/g, " ").trim())
                        }
                        edit={editable}
                        ref={nameRef}
                        handleKeypress={(e) => _handleKeypress(e)}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <SelectBox
                        Name="Disease"
                        Placeholder="Disease"
                        val={disease}
                        isRequired={false}
                        options={diseasesList}
                        handleVal={(val) => setDisease(val)}
                        edit={editable}
                        ref={setDiseaseRef}
                      />
                    </Col>
                    {questionnairetype == "#115:0" ||
                      questionnairetype == "#179:0" ? (
                        <Col md="6" className="form-group">
                          <SelectBox
                            Name="Survey Category"
                            Placeholder="Survey Category"
                            val={surveyCategory}
                            optName="categoryName"
                            options={surveyCategories}
                            handleVal={(val) => setSurveyCategory(val)}
                            edit={editable}
                            ref={SurveyCategoryRef}
                          />
                        </Col>
                      ) : (
                        ""
                      )}
                    <Col md="12" className="form-group">
                      <label>Description</label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        readOnly={!editable ? true : false}
                      />
                    </Col>
                    <Col md="12" className="form-group">
                      <div className="dragDropBlock">
                        <Row>
                          <Col
                            md="6"
                            className="form-group d-flex flex-column dragDropCol"
                          >
                            <Heading3>Available Questions</Heading3>
                            <div className="dragListItemBlc overflow-auto d-flex flex-column flex-fill">
                              {items.map((item, index) => (
                                <div
                                  key={index}
                                  style={{ backgroundColor: item.colour }}
                                  className="dragListItemWrapper d-flex flex-column"
                                >
                                  <div
                                    onClick={() => togglel(item["@rid"])}
                                    className="dragListItem d-flex"
                                    style={getItemStyle(item.colour)}
                                  >
                                    <label className="flex-fill mb-0">
                                      {item.categoryName}
                                    </label>
                                    <span
                                      className={`ml-auto d-inline-flex align-items-center justify-content-center ${tabTogglel === item["@rid"]
                                        ? "active"
                                        : ""
                                        }`}
                                    >
                                      <i className="material-icons">
                                        navigate_next
                                      </i>
                                    </span>
                                  </div>

                                  <Collapse
                                    isOpen={tabTogglel === item["@rid"]}
                                  >
                                    <div className="answerBlc overflow-auto">
                                      <ul className="list-unstyled m-0">
                                        {item.questions &&
                                          item.questions.map(
                                            (qustn, qIndex) => (
                                              <li key={qIndex} className="dragListItemWrapper">
                                                <div className="dragListItemWrapper d-flex flex-column">
                                                  <div className="dragListItem d-flex">
                                                    <label className="p-0 mb-0">
                                                      {qustn.question.length >
                                                        100
                                                        ? `${qustn.question.substring(
                                                          0,
                                                          100
                                                        )}...`
                                                        : qustn.question}
                                                    </label>
                                                    <span
                                                      className={`ml-auto d-inline-flex align-items-center justify-content-center`}
                                                      onClick={() => {
                                                        _selectQuestion(
                                                          item["@rid"],
                                                          qustn["@rid"],
                                                          "",
                                                          index,
                                                          "",
                                                          qIndex
                                                        );
                                                      }}
                                                    >
                                                      <i className="material-icons">
                                                        navigate_next
                                                      </i>
                                                    </span>
                                                  </div>
                                                  <Collapse
                                                    isOpen={
                                                      tabTogglel ===
                                                      item["@rid"]
                                                    }
                                                  >
                                                    <div className="answerBlc answerBlcList">
                                                      <ul className="list-unstyled m-0">
                                                        {qustn.dependencyQuestions &&
                                                          qustn.dependencyQuestions.map(
                                                            (
                                                              depQust,
                                                              index
                                                            ) => (
                                                                <li className="d-flex">
                                                                  <label className="p-0 mb-0 flex-fill">
                                                                    {depQust
                                                                      .question
                                                                      .length >
                                                                      100
                                                                      ? `${depQust.question.substring(
                                                                        0,
                                                                        100
                                                                      )}...`
                                                                      : depQust.question}
                                                                  </label>
                                                                </li>
                                                              )
                                                          )}
                                                      </ul>
                                                    </div>
                                                  </Collapse>
                                                </div>
                                              </li>
                                            )
                                          )}
                                      </ul>
                                      {item.children &&
                                        item.children.map((item1, chindex) => (
                                          <div key={chindex}
                                            style={{
                                              backgroundColor: item1.colour,
                                            }}
                                            className="dragListItemWrapper d-flex flex-column"
                                          >
                                            <div
                                              onClick={() =>
                                                togglel2(item1["@rid"])
                                              }
                                              className="dragListItem d-flex"
                                              style={getItemStyle(item1.colour)}
                                            >
                                              <label className="flex-fill mb-0">
                                                {item1.categoryName}
                                              </label>
                                              <span
                                                className={`ml-auto d-inline-flex align-items-center justify-content-center ${tabTogglel2 === item1["@rid"]
                                                  ? "active"
                                                  : ""
                                                  }`}
                                              >
                                                <i className="material-icons">
                                                  navigate_next
                                                </i>
                                              </span>
                                            </div>

                                            <Collapse
                                              isOpen={
                                                tabTogglel2 === item1["@rid"]
                                              }
                                            >
                                              <div className="answerBlc overflow-auto">
                                                <ul className="list-unstyled m-0">
                                                  {item1.questions &&
                                                    item1.questions.map(
                                                      (qustn1, quIndx) => (
                                                        <li>
                                                          <div className="dragListItemWrapper d-flex flex-column">
                                                            <div className="dragListItem d-flex">
                                                              <label className="p-0 mb-0">
                                                                {qustn1.question
                                                                  .length > 100
                                                                  ? `${qustn1.question.substring(
                                                                    0,
                                                                    100
                                                                  )}...`
                                                                  : qustn1.question}
                                                              </label>
                                                              <span
                                                                className={`ml-auto d-inline-flex align-items-center justify-content-center`}
                                                                onClick={() => {
                                                                  _selectQuestion(
                                                                    item[
                                                                    "@rid"
                                                                    ],
                                                                    qustn1[
                                                                    "@rid"
                                                                    ],
                                                                    item1[
                                                                    "@rid"
                                                                    ],
                                                                    index,
                                                                    chindex,
                                                                    quIndx
                                                                  );
                                                                }}
                                                              >
                                                                <i className="material-icons">
                                                                  navigate_next
                                                                </i>
                                                              </span>
                                                            </div>
                                                            <div className="answerBlc answerBlcList">
                                                              <ul className="list-unstyled m-0">
                                                                {qustn1.dependencyQuestions &&
                                                                  qustn1.dependencyQuestions.map(
                                                                    (
                                                                      depQust,
                                                                      index
                                                                    ) => (
                                                                        <li key={index} className="d-flex">
                                                                          <label className="p-0 mb-0 flex-fill">
                                                                            {depQust
                                                                              .question
                                                                              .length >
                                                                              100
                                                                              ? `${depQust.question.substring(
                                                                                0,
                                                                                100
                                                                              )}...`
                                                                              : depQust.question}
                                                                          </label>
                                                                        </li>
                                                                      )
                                                                  )}
                                                              </ul>
                                                            </div>
                                                          </div>
                                                        </li>
                                                      )
                                                    )}
                                                </ul>
                                              </div>
                                            </Collapse>
                                          </div>
                                        ))}
                                    </div>
                                  </Collapse>
                                </div>
                              ))}
                            </div>
                          </Col>

                          <Col
                            md="6"
                            className="form-group d-flex flex-column dragDropCol"
                          >
                            <Heading3>Selected Questions</Heading3>
                            <DragDropContext onDragEnd={onDragEnd}>
                              <Droppable
                                droppableId="droppable2"
                                isDragDisabled={editable ? false : true}
                              >
                                {(provided, snapshot) => (
                                  <>
                                    <div
                                      ref={provided.innerRef}
                                      style={getListStyle(
                                        snapshot.isDraggingOver
                                      )}
                                      className="dragListItemBlc overflow-auto d-flex flex-column flex-fill"
                                    >
                                      {selected.map((item, sIndex) => (
                                        <Draggable
                                          isDragDisabled={
                                            editable ? false : true
                                          }
                                          key={item["@rid"]}
                                          draggableId={item["@rid"]}
                                          index={sIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <>
                                              <div
                                                key={sIndex}
                                                className="dragListItem d-flex"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyleFor(
                                                  snapshot.isDragging,
                                                  provided.draggableProps.style,
                                                  item.colour
                                                )}
                                                className="dragListItemWrapper d-flex flex-column"
                                              >
                                                <div
                                                  onClick={() =>
                                                    toggle2(item["@rid"])
                                                  }
                                                  className="dragListItem d-flex"
                                                  style={getItemStyle(
                                                    item.colour
                                                  )}
                                                >
                                                  <label className="flex-fill mb-0">
                                                    {item.categoryName}
                                                  </label>
                                                  <span
                                                    className={`ml-auto d-inline-flex align-items-center justify-content-center ${tabToggle2 ===
                                                      item["@rid"]
                                                      ? "active"
                                                      : ""
                                                      }`}
                                                  >
                                                    <i className="material-icons">
                                                      navigate_next
                                                    </i>
                                                  </span>
                                                </div>

                                                <Collapse
                                                  isOpen={
                                                    tabToggle2 === item["@rid"]
                                                  }
                                                >
                                                  <div className="answerBlc overflow-auto">
                                                    <ul className="list-unstyled m-0">
                                                      {item.questions &&
                                                        item.questions.map(
                                                          (qustn, QIndex) => (
                                                            <li className="dragListItemWrapper">
                                                              <div className="dragListItemWrapper d-flex flex-column">
                                                                <div className="dragListItem d-flex">
                                                                  <label className="p-0 mb-0">
                                                                    {qustn
                                                                      .question
                                                                      .length >
                                                                      100
                                                                      ? `${qustn.question.substring(
                                                                        0,
                                                                        100
                                                                      )}...`
                                                                      : qustn.question}
                                                                  </label>
                                                                  <span
                                                                    className={`ml-auto d-inline-flex align-items-center justify-content-center`}
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      _removeSelectedItems(
                                                                        sIndex,
                                                                        "",
                                                                        QIndex,
                                                                        ""
                                                                      )
                                                                    }
                                                                  >
                                                                    <i className="material-icons">
                                                                      keyboard_arrow_left
                                                                    </i>
                                                                  </span>
                                                                </div>
                                                                <div className="answerBlc answerBlcList">
                                                                  <ul className="list-unstyled m-0">
                                                                    {qustn.dependencyQuestions &&
                                                                      qustn.dependencyQuestions.map(
                                                                        (
                                                                          depQust,
                                                                          dIndex
                                                                        ) => (
                                                                            <li className="d-flex">
                                                                              <label className="p-0 mb-0 flex-fill">
                                                                                {depQust
                                                                                  .question
                                                                                  .length >
                                                                                  100
                                                                                  ? `${depQust.question.substring(
                                                                                    0,
                                                                                    100
                                                                                  )}...`
                                                                                  : depQust.question}
                                                                              </label>
                                                                              <span
                                                                                className={`ml-auto d-inline-flex align-items-center justify-content-center`}
                                                                                onClick={(
                                                                                  e
                                                                                ) =>
                                                                                  _removeSelectedItems(
                                                                                    sIndex,
                                                                                    "",
                                                                                    QIndex,
                                                                                    dIndex
                                                                                  )
                                                                                }
                                                                              >
                                                                                <i className="material-icons">
                                                                                  keyboard_arrow_left
                                                                              </i>
                                                                              </span>
                                                                            </li>
                                                                          )
                                                                      )}
                                                                  </ul>
                                                                </div>
                                                              </div>
                                                            </li>
                                                          )
                                                        )}
                                                    </ul>
                                                    {item.children &&
                                                      item.children.map(
                                                        (item1, cIndex) => (
                                                          <div
                                                            style={{
                                                              backgroundColor:
                                                                item1.colour,
                                                            }}
                                                            className="dragListItemWrapper d-flex flex-column"
                                                          >
                                                            <div
                                                              onClick={() =>
                                                                toggle3(
                                                                  item1["@rid"]
                                                                )
                                                              }
                                                              className="dragListItem d-flex"
                                                              style={getItemStyle(
                                                                item1.colour
                                                              )}
                                                            >
                                                              <label className="flex-fill mb-0">
                                                                {
                                                                  item1.categoryName
                                                                }
                                                              </label>
                                                              <span
                                                                className={`ml-auto d-inline-flex align-items-center justify-content-center ${tabToggle3 ===
                                                                  item1["@rid"]
                                                                  ? "active"
                                                                  : ""
                                                                  }`}
                                                              >
                                                                <i className="material-icons">
                                                                  navigate_next
                                                                </i>
                                                              </span>
                                                            </div>

                                                            <Collapse
                                                              isOpen={
                                                                tabToggle3 ===
                                                                item1["@rid"]
                                                              }
                                                            >
                                                              <div className="answerBlc overflow-auto">
                                                                <ul className="list-unstyled m-0">
                                                                  {item1.questions &&
                                                                    item1.questions.map(
                                                                      (
                                                                        qustn1,
                                                                        QIndex
                                                                      ) => (
                                                                          <li>
                                                                            <div className="dragListItemWrapper d-flex flex-column">
                                                                              <div className="dragListItem d-flex">
                                                                                <label className="p-0 mb-0">
                                                                                  {qustn1
                                                                                    .question
                                                                                    .length >
                                                                                    100
                                                                                    ? `${qustn1.question.substring(
                                                                                      0,
                                                                                      100
                                                                                    )}...`
                                                                                    : qustn1.question}
                                                                                </label>
                                                                                <span
                                                                                  className={`ml-auto d-inline-flex align-items-center justify-content-center`}
                                                                                  onClick={(
                                                                                    e
                                                                                  ) =>
                                                                                    _removeSelectedItems(
                                                                                      sIndex,
                                                                                      cIndex,
                                                                                      QIndex,
                                                                                      ""
                                                                                    )
                                                                                  }
                                                                                >
                                                                                  <i className="material-icons">
                                                                                    keyboard_arrow_left
                                                                                </i>
                                                                                </span>
                                                                              </div>
                                                                              <div className="answerBlc answerBlcList">
                                                                                <ul className="list-unstyled m-0">
                                                                                  {qustn1.dependencyQuestions &&
                                                                                    qustn1.dependencyQuestions.map(
                                                                                      (
                                                                                        depQust,
                                                                                        dIndex
                                                                                      ) => (
                                                                                          <li className="d-flex">
                                                                                            <label className="p-0 mb-0 flex-fill">
                                                                                              {depQust
                                                                                                .question
                                                                                                .length >
                                                                                                100
                                                                                                ? `${depQust.question.substring(
                                                                                                  0,
                                                                                                  100
                                                                                                )}...`
                                                                                                : depQust.question}
                                                                                            </label>
                                                                                            <span
                                                                                              className={`ml-auto d-inline-flex align-items-center justify-content-center`}
                                                                                              onClick={(
                                                                                                e
                                                                                              ) =>
                                                                                                _removeSelectedItems(
                                                                                                  sIndex,
                                                                                                  cIndex,
                                                                                                  QIndex,
                                                                                                  dIndex
                                                                                                )
                                                                                              }
                                                                                            >
                                                                                              <i className="material-icons">
                                                                                                keyboard_arrow_left
                                                                                          </i>
                                                                                            </span>
                                                                                          </li>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                              </div>
                                                                            </div>
                                                                          </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                              </div>
                                                            </Collapse>
                                                          </div>
                                                        )
                                                      )}
                                                    {/* {item.questions && item.questions.map((qustn, index) =>
                                        <li className="d-flex">
                                          <span onClick={_selectQuestion(qustn['@rid'], item['@rid'], 1)}>
                                            <i className="material-icons mr-1">keyboard_arrow_right</i>
                                          </span>
                                          <label className="p-0 mb-0">
                                            {qustn.question}
                                          </label>
                                        </li>
                                        )} */}
                                                  </div>
                                                </Collapse>
                                              </div>
                                            </>
                                          )}
                                        </Draggable>
                                      ))}
                                      {provided.placeholder}
                                    </div>
                                  </>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md="6" className="form-group">
                      <CheckBox
                        Name="Status"
                        className="withInput"
                        value={status}
                        handleVal={() => setStatus(!status)}
                        edit={details ? (editable ? true : false) : true}
                      />
                    </Col>
                  </Row>
                  {/* <FormButtons className="text-right" /> */}
                  <div className="formBtns text-right">
                    {details ? (
                      editable ? (
                        <Button theme="white" onClick={() => cancel()}>
                          Cancel
                        </Button>
                      ) : (
                          ""
                        )
                    ) : (
                        <Button theme="white" onClick={() => cancel()}>
                          Cancel
                        </Button>
                      )}
                    {details ? (
                      editable ? (
                        <Button
                          theme="accent"
                          onClick={() => checkValidationAndSubmit()}
                        >
                          Update
                        </Button>
                      ) : (
                          ""
                        )
                    ) : (
                        <Button
                          theme="accent"
                          onClick={() => checkValidationAndSubmit()}
                        >
                          Submit
                        </Button>
                      )}
                  </div>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
};

export default QuestionnaireForm;
