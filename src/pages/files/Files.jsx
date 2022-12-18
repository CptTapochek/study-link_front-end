import style from "./files.module.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {setGlobalState} from "../../state/header";


const Files = () => {
    setGlobalState("headerTitle", "Files");

    const [files, setFiles] = useState([
        {
            id: 0,
            title: "Fake file 1",
            date: "13/11/2022",
            courseTitle: "Random course title 1",
            downloadLink: "document23873636",
        },
        {
            id: 1,
            title: "Fake file 2",
            date: "05/11/2022",
            courseTitle: "Random course title 2",
            downloadLink: "document64748332",
        },
    ]);

    const fileElements = files.map(
        item => <FileItem
            key={item.id.toString()}
            id={item.id}
            title={item.title}
            date={item.date}
            courseTitle={item.courseTitle}
            downloadLink={item.downloadLink}
        />
    );

    return (
        <div className={style.main}>
            <div className={style.title}>
                <p>Saved Files</p>
            </div>
            <div className={style.infoBlock}>
                <p className={style.fileName}>File Name</p>
                <p className={style.course}>Course</p>
                <p className={style.date}>Date</p>
                <p className={style.action}>Action</p>
            </div>
            <div className={style.filesList}>{fileElements}</div>
        </div>
    );
};

const FileItem = (props) => {
    return <div className={style.file}>
        <div className={style.fileTitle}>
            <i/><p>{props.title}</p>
        </div>
        <div className={style.courseTitle}>{props.courseTitle}</div>
        <div className={style.fileDate}>{props.date}</div>
        <div className={style.fileActions}>
            <NavLink className={style.download} to={`download/file/${props.downloadLink}`}>
                <i/><p>Download</p>
            </NavLink>
            <div className={style.delete}>
                <i/><p>Delete</p>
            </div>
        </div>
    </div>
}

export default Files;