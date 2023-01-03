import style from "./create-course.module.css";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {CREATE_COURSE} from "../../mutations/course";


const CreateCourse = () => {
    const teacher = JSON.parse(localStorage.getItem("user"));
    const [courseTitle, setCourseTitle] = useState("");
    const [validMessage, setValidMessage] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [newCourse] = useMutation(CREATE_COURSE);
    const navigate = useNavigate();

    const onChangeTextInput = (e) => {
        const { name, value } = e.target;
        let message = validMessage;
        switch (name) {
            case "courseTitle":
                delete message.course_title;
                setCourseTitle(value);
                break;
            default: break;
        }
        setValidMessage(message);
    };

    const sendData = async (e) => {
        e.preventDefault();
        let message = {};
        let validate = true;

        /* Validation */
        if(courseTitle.length === 0) {
            message.course_title = "Please fill out this field";
            validate = false;
        }
        setValidMessage(message);

        if(validate) {
            let processes = 0;
            for (let item of subjects) {
                if(item.type === "QUIZ") { processes++ }
            }

            newCourse({
                variables: {
                    input: {
                        title: courseTitle,
                        processes: processes,
                        teacher: {
                            _id: teacher["_id"],
                            name: teacher["name"],
                            surname: teacher["surname"],
                            email: teacher["email"],
                        },
                        subjects: subjects
                    }
                }
            }).then (({data}) => {
                console.log(data);
                navigate("/courses");
            });
        }
    }

    const CourseElements = subjects.map(
        (item, index) => <CourseItem
            key={Math.floor(Math.random() * 1000)}
            title={item.title}
            type={item.type}
            subjects={subjects}
            setSubjects={setSubjects}
            index={index}
        />
    );

    const addTopic = () => {
        let subjectsDraft = subjects;
        subjectsDraft.push({title: "", type: "LEARN", files: []});
        setSubjects([...subjectsDraft]);
    }

    const addQuiz = () => {
        let subjectsDraft = subjects;
        subjectsDraft.push({
              title: "",
              type: "QUIZ",
              quiz_details: {
                  max_score: 0,
                  questions: []
              }
        });
      setSubjects([...subjectsDraft]);
    }

    return (
        <div className={style.main}>
            <form className={style.mainUserSettings} onSubmit={sendData}>
                {/* Course title */}
                <div className={style.section}>
                    <div className={style.inputLong}>
                        <label htmlFor="courseTitle">Course title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            style={validMessage.firstName ? {border: "1px solid red"} : {}}
                            onChange={onChangeTextInput}
                            value={courseTitle}
                        />
                        <p>{validMessage.course_title}</p>
                    </div>
                </div>
                {CourseElements}
                <div className={style.addItems}>
                    <div onClick={addTopic}>Add Topic</div>
                    <div onClick={addQuiz}>Add Quiz</div>
                </div>

                {/* Submit Button */}
                <div className={style.section}>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}

const CourseItem = (props) => {
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [documentUrl, setDocumentUrl] = useState([]);


    const onChangeItemTitle = (e) => {
        const { name, value } = e.target;
        let tempSubjects = props.subjects;
        tempSubjects[props.index]["title"] = value;
        props.setSubjects(tempSubjects);
    }

    useEffect(() => {
        if (selectedDocument.length > 0) {
            let selectedDocumentsDraft = selectedDocument;
            let existFiles = documentUrl;
            for (let element of selectedDocumentsDraft){
                if(element.haveURL === false){
                    existFiles.push(URL.createObjectURL(element));
                    element.haveURL = true;
                }
            }
            setDocumentUrl([...existFiles]);
            setSelectedDocument(selectedDocumentsDraft);
        }
    }, [selectedDocument.length]);


    function getBase64 (file) {
        let reader = new FileReader();
        let encodedData;
        let subjectsDraft = props.subjects;
        reader.readAsDataURL(file);
        reader.onload = function () {
            encodedData = reader.result;
            subjectsDraft[props.index].files.push({
                title: file.name,
                type: file.type,
                size: file.size,
                data: encodedData
            });
            props.setSubjects(subjectsDraft);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const addDocument = (e) => {
        let files = selectedDocument;
        for (let i = 0; i < e.target.files.length; i++){
            e.target.files[i].animation = true;
            e.target.files[i].haveURL = false;
            let fileName = e.target.files[i].name.split(".").pop();
            let allowedExtensions = ["jpg", "jpeg", "png", "pdf", "xls", "csv", "zip", "rar", "xlsx", "doc", "txt"];
            for (let extension of allowedExtensions){
                if (fileName === extension){
                    getBase64(e.target.files[i]);
                    files.push(e.target.files[i]);
                }
            }
        }
        setSelectedDocument([...files]);
    };

    const deleteDocument = (e) => {
        let existDocuments = selectedDocument;
        let existDocsUrl = documentUrl;
        let subjectsDraft = props.subjects;

        for (let i = 0; i < existDocuments.length; i++){
            if (existDocuments[i].name === e.target.getAttribute("document")){
                existDocuments.splice(i, 1);
                existDocsUrl.splice(i, 1);
                subjectsDraft[props.index].files.splice(i, 1);
            }
        }
        setSelectedDocument([...existDocuments]);
        setDocumentUrl([...existDocsUrl]);
        props.setSubjects(subjectsDraft);
    };

    const deleteDocumentFromSubject = (e) => {
        let subjectsDraft = props.subjects;
        for (let i = 0; i < subjectsDraft[props.index].files.length; i++){
            if (subjectsDraft[props.index].files[i].title === e.target.getAttribute("document")){
                subjectsDraft[props.index].files.splice(i, 1);
            }
        }
        props.setSubjects([...subjectsDraft]);
    }

    let documentElements;
    let savedDocsElements;
    let subjectFiles = props.subjects[props.index].files;
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };
    if(subjectFiles !== undefined) {
        if (selectedDocument.length > 0 && subjectFiles.length === 0){
            documentElements = selectedDocument.map(
                file => <AddedDocument
                    key={file.size + getRandomInt(1000)}
                    animation={file.animation}
                    name={file.name}
                    ext={file.name.split(".").pop()}
                    size={file.size}
                    deleteDocument={deleteDocument}
                    setSelectedDocument={setSelectedDocument}
                    selectedDocument={selectedDocument}
                />
            );
        } else if(selectedDocument.length === 0 && subjectFiles.length > 0) {
            savedDocsElements = subjectFiles.map(
                file => <AddedDocument
                    key={getRandomInt(10000)}
                    animation={false}
                    name={file.title}
                    ext={file.title.split(".").pop()}
                    size={file.size}
                    deleteDocument={deleteDocumentFromSubject}
                    selectedDocument={[]}
                />
            );
        } else if(selectedDocument.length > 0 && subjectFiles.length > 0) {
            documentElements = selectedDocument.map(
                file => <AddedDocument
                    key={file.size + getRandomInt(1000)}
                    animation={file.animation}
                    name={file.name}
                    ext={file.name.split(".").pop()}
                    size={file.size}
                    deleteDocument={deleteDocument}
                    setSelectedDocument={setSelectedDocument}
                    selectedDocument={selectedDocument}
                />
            );
            savedDocsElements = subjectFiles.map(
                file => <AddedDocument
                    key={getRandomInt(10000)}
                    animation={false}
                    name={file.title}
                    ext={file.title.split(".").pop()}
                    size={file.size}
                    deleteDocument={deleteDocumentFromSubject}
                    selectedDocument={[]}
                />
            );
        }
    }


    const deleteSubject = () => {
        let subjectDraft = props.subjects;
        if(props.index > 0){
            subjectDraft.splice(props.index, props.index);
        } else {
            subjectDraft.splice(props.index, props.index + 1);
        }
        props.setSubjects([...subjectDraft]);
    }

    if(props.type === "LEARN"){
        return (
            <div className={style.subject}>
                <div className={style.subjectTitle}>
                    <input
                        onChange={onChangeItemTitle}
                        placeholder="Enter the title of the topic"
                    />
                    <div className={style.deleteSubject} title="Delete" onClick={deleteSubject}/>
                </div>
                <label htmlFor="file-upload" className={style.addFilesButton}>Add Files</label>
                <input
                    accept="*"
                    type="file"
                    multiple
                    id="file-upload"
                    onChange={addDocument}
                />
                <div className={style.uploadTextPrompt}>XLS, PDF, DOC or JPG (max. 800x400px)</div>
                <div className={style.files}>
                    {documentElements}
                    {savedDocsElements}
                </div>
            </div>
        );
    } else if(props.type === "QUIZ") {
        const questionElements = props.subjects[props.index].quiz_details.questions.map(
            (item, index) => <QuestionElement
                key={Math.floor(Math.random() * 10000)}
                title={item.title}
                type={item.type}
                responses={item.responses}
                subjectIndex={props.index}
                index={index}
                subjects={props.subjects}
                setSubjects={props.setSubjects}
            />
        );

        const addQuestion = () => {
            let subjectDraft = props.subjects;
            subjectDraft[props.index].quiz_details.questions.push({
                title: "",
                type: "MULTI_RESPONSE",
                responses: [
                    {title: "", correct: false},
                    {title: "", correct: false},
                    {title: "", correct: false},
                ]
            })
            props.setSubjects([...subjectDraft]);
        }

        function getMaximalScore() {
            let subjectsDraft = props.subjects;
            let max_score = 0;
            for (let i = 0; i < subjectsDraft[props.index].quiz_details.questions.length; i++) {
                if(subjectsDraft[props.index].quiz_details.questions[i].type === "TEXT_RESPONSE"){
                    max_score++;
                    for (let e = 0; e < subjectsDraft[props.index].quiz_details.questions[i].responses.length; e++){
                        delete subjectsDraft[props.index].quiz_details.questions[i].responses[e].correct;
                    }
                } else {
                    for (let j = 0; j < subjectsDraft[props.index].quiz_details.questions[i].responses.length; j++) {
                        if(subjectsDraft[props.index].quiz_details.questions[i].responses[j].correct === true) {
                            max_score++;
                        }
                    }
                }
            }
            if(subjectsDraft[props.index].quiz_details.max_score !== max_score) {
                subjectsDraft[props.index].quiz_details.max_score = max_score;
                props.setSubjects(subjectsDraft);
            }
            return max_score;
        }

        return (
            <div className={style.subject}>
                <div className={style.subjectTitle}>
                    <input
                        onChange={onChangeItemTitle}
                        placeholder="Enter the title of the quiz"
                    />
                    <div className={style.deleteSubject} title="Delete" onClick={deleteSubject}/>
                </div>
                <div className={style.questionsList}>
                    {questionElements}
                </div>
                <div className={style.quizScore}>Quiz score: {getMaximalScore()}</div>
                <div className={style.addQuestionButton} onClick={addQuestion}>Add Question</div>
            </div>
        );
    }
}

/* Get input documents */
const AddedDocument = (props) => {
    const [counter, setCounter] = React.useState(0);
    React.useEffect(() => {
        if (props.animation === true){
            counter < 100 && setTimeout(() => setCounter(counter + 1), 9);
        } else {
            setCounter(100);
        }
    }, [counter]);

    if (counter === 100){
        let files = props.selectedDocument;
        for (let file of files){
            if (file.name === props.name){
                file.animation = false;
            }
        }
    }

    return (
        <div className={style.document}>
            <div className={style.topBlock}>
                <div className={style.documentImage}/>
                <div className={style.textBlock}>
                    <div className={style.documentTitle}>{props.name}</div>
                    <div className={style.documentSize}>
                        {convertSize(props.size)}
                    </div>
                </div>
                <div className={style.documentDelete} document={props.name} onClick={props.deleteDocument} title="Delete"/>
            </div>
            <div className={style.bottomBlock}>
                <div className={style.loadingBar}>
                    <div className={`${style.loadingBarBlue} ${props.animation === true ? style.animateLoading : ""}`}/>
                    <div className={style.loadingBarDisabled}/>
                </div>
                <div className={style.loadingPercent}>{counter}%</div>
            </div>
        </div>
    );
};

const convertSize = (size) => {
    let result;
    if (size < 1024){
        result = size + " bytes";
    } else if (size > 1024 && size < Math.pow(1024, 2)){
        result = (size/1024).toFixed(2) + " KB";
    } else if (size > Math.pow(1024, 2)){
        result = (size/Math.pow(1024, 2)).toFixed(2) + " MB";
    }
    return result;
};

const QuestionElement = (props) => {
    const [questionTitle, setQuestionTitle] = useState(props.subjects[props.subjectIndex].quiz_details.questions[props.index].title);
    const responseElements = props.responses.map(
        (item, index) => <ResponseElement
            key={Math.floor(Math.random() * 10000)}
            type={props.type}
            title={item.title}
            correct={item.correct}
            subjectIndex={props.subjectIndex}
            questionIndex={props.index}
            index={index}
            subjects={props.subjects}
            setSubjects={props.setSubjects}
        />
    );

    const deleteQuestion = () => {
        let subjectDraft = props.subjects;
        if(props.index > 0){
            subjectDraft[props.subjectIndex].quiz_details.questions.splice(props.index, props.index);
        } else {
            subjectDraft[props.subjectIndex].quiz_details.questions.splice(props.index, props.index + 1);
        }
        props.setSubjects([...subjectDraft]);
    }

    const onChangeItemTitle = (e) => {
        const { name, value } = e.target;
        let subjectsDraft = props.subjects;
        subjectsDraft[props.subjectIndex].quiz_details.questions[props.index].title = value;
        setQuestionTitle(value);
        props.setSubjects(subjectsDraft);
    }

    const onChangeQuestionOption = (e) => {
        const { name, value } = e.target;
        let subjectsDraft = props.subjects;
        subjectsDraft[props.subjectIndex].quiz_details.questions[props.index].type = value;
        props.setSubjects([...subjectsDraft]);
    }

    const addResponse = () => {
        let subjectsDraft = props.subjects;
        subjectsDraft[props.subjectIndex].quiz_details.questions[props.index].responses.push({title: "", correct: false});
        props.setSubjects([...subjectsDraft]);
    }

    return (
      <div className={style.question}>
          <div className={style.questionHeader}>
              <div className={style.questionTitle}>
                  <textarea
                      placeholder="Enter the question"
                      onChange={onChangeItemTitle}
                      value={questionTitle}
                  />
              </div>
              <select defaultValue={props.type} onChange={onChangeQuestionOption}>
                  <option value="ONE_RESPONSE">One-response</option>
                  <option value="MULTI_RESPONSE">Multi-response</option>
                  <option value="TEXT_RESPONSE">Text-response</option>
              </select>
          </div>
          <div className={style.responseList}>
              {responseElements}
          </div>
          <div className={style.responseActions}>
              {props.type !== "TEXT_RESPONSE" ? <div className={style.addResponse} onClick={addResponse}>Add</div> : <div/>}
              <div className={style.deleteQuestion} onClick={deleteQuestion}><i/>Delete</div>
          </div>
      </div>
    );
}

const ResponseElement = (props) => {
    const [responseTitle, setResponseTitle] = useState(props.subjects[props.subjectIndex].quiz_details.questions[props.questionIndex].responses[props.index].title);

    const deleteResponse = () => {
        let subjectDraft = props.subjects;
        if(props.index > 0){
            subjectDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses.splice(props.index, props.index);
        } else {
            subjectDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses.splice(props.index, props.index + 1);
        }
        props.setSubjects([...subjectDraft]);
    }

    const onChangeResponseTitle = (e) => {
        const { name, value } = e.target;
        let subjectsDraft = props.subjects;
        subjectsDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses[props.index].title = value;
        setResponseTitle(value);
        props.setSubjects(subjectsDraft);
    }

    const onChangeMultiResponse = () => {
        let subjectsDraft = props.subjects;
        let value = subjectsDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses[props.index].correct;
        subjectsDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses[props.index].correct = !value;
        props.setSubjects([...subjectsDraft]);
    }

    const onChangeOneResponse = () => {
        let subjectsDraft = props.subjects;
        for(let idx = 0; idx < subjectsDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses.length; idx++) {
            subjectsDraft[props.subjectIndex].quiz_details.questions[props.questionIndex].responses[idx].correct = idx === props.index;
        }
        props.setSubjects([...subjectsDraft]);
    }

    let Response;
    switch (props.type){
        case "ONE_RESPONSE":
            Response = (
                <div className={style.oneResponseType}>
                    <input
                        type="radio"
                        name={props.questionIndex}
                        checked={props.correct}
                        className={style.responseIsCorrect}
                        onChange={onChangeOneResponse}
                    />
                    <input
                        type="text"
                        className={style.responseTitle}
                        placeholder="Enter the response"
                        name={props.questionIndex}
                        value={responseTitle}
                        onChange={onChangeResponseTitle}
                    />
                    <div className={style.deleteResponse} title="Delete" onClick={deleteResponse}/>
                </div>
            );
            break;
        case "MULTI_RESPONSE":
            Response = (
                <div className={style.multiResponseType}>
                    <input
                        type="checkbox"
                        name={props.questionIndex}
                        className={style.responseIsCorrect}
                        checked={props.correct}
                        onChange={onChangeMultiResponse}
                    />
                    <input
                        type="text"
                        className={style.responseTitle}
                        placeholder="Enter the response"
                        name={props.questionIndex}
                        value={responseTitle}
                        onChange={onChangeResponseTitle}
                    />
                    <div className={style.deleteResponse} title="Delete" onClick={deleteResponse}/>
                </div>
            );
            break;
        case "TEXT_RESPONSE":
            Response = (<div/>);
            break;
    }

    return Response;
}

export default CreateCourse;