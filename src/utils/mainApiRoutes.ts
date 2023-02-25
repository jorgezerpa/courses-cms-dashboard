const BASE_URL = 'http://localhost:3001/api/v1'


export const routes = {
    getCourses:()=>`${BASE_URL}/courses`,
    createCourses:()=>`${BASE_URL}/courses`,
    getCourse:(courseId:String)=>`${BASE_URL}/courses/${courseId}`,
    updateCourse:(courseId:String)=>`${BASE_URL}/courses/${courseId}`,
    deleteCourse:(courseId:String)=>`${BASE_URL}/courses/${courseId}`,
    
    createSection:(courseId:string)=>`${BASE_URL}/sections/${courseId}`,
    getSections:(courseId:string)=>`${BASE_URL}/sections/${courseId}`,
    getSection:(sectionId:string)=>`${BASE_URL}/sections/get-section/${sectionId}`,
    updateSection:(sectionId:string)=>`${BASE_URL}/sections/${sectionId}`,
    deleteSection:(sectionId:string)=>`${BASE_URL}/sections/${sectionId}`,
    
    createLesson:(sectionId:string)=>`${BASE_URL}/lessons/${sectionId}`,
    getLessons:(sectionId:string)=>`${BASE_URL}/lessons/${sectionId}`,
    getLesson:(sectionId:string)=>`${BASE_URL}/lessons/get-lesson/${sectionId}`,
    updateLesson:(sectionId:string)=>`${BASE_URL}/lessons/${sectionId}`,
    deleteLesson:(lessonId:string)=>`${BASE_URL}/lessons/${lessonId}`,
    addVideoToLesson:(lessonId:string)=>`${BASE_URL}/lessons/assets/addVideo/${lessonId}`,
    
    
}
