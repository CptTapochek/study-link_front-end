import style from "./files.module.css";


const Files = () => {

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
            <div className={style.filesList}>
                <div className={style.file}>
                    <div className={style.fileTitle}>
                        <i/><p>example_file_1.ext</p>
                    </div>
                    <div className={style.courseTitle}>Random title</div>
                    <div className={style.fileDate}>13/11/2022</div>
                    <div className={style.fileActions}>
                        <div className={style.download}>
                            <i/><p>Download</p>
                        </div>
                        <div className={style.delete}>
                            <i/><p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Files;