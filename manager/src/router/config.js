import dynamic from "dva/dynamic";
const QuestionsAdd = dynamic({
  component: () => import("@/views/Main/Questions/Add")
});
const SourtQuestions = dynamic({
  component: () => import("@/views/Main/Questions/Type")
});
const View = dynamic({
  component: () => import("@/views/Main/Questions/View")
});
const AddUser = dynamic({
  component: () => import("@/views/Main/ShowUser/AddUser")
});
const Show = dynamic({
  component: () => import("@/views/Main/ShowUser/Show")
});
const QuestionDetail = dynamic({
  component: () => import("@/views/Main/Questions/Detail")
});
const QuestionEdit = dynamic({
  component: () => import("@/views/Main/Questions/Edit")
});
const ExamAdd = dynamic({
  component: () => import("@/views/Main/Exam/Add")
});
const ExamList = dynamic({
  component: () => import("@/views/Main/Exam/List")
});
const ExamEdit = dynamic({
  component: () => import("@/views/Main/Exam/Edit")
});
const ExamDetail = dynamic({
  component: () => import("@/views/Main/Exam/Detail")
});
const Grade = dynamic({
  component: () => import("@/views/Main/Class/Grade")
});
const Room = dynamic({
  component: () => import("@/views/Main/Class/Room")
});
const Student = dynamic({
  component: () => import("@/views/Main/Class/Student")
});
const MarkClassList = dynamic({
  component: () => import("@/views/Main/Mark/ClassList")
});
const MarkClassMate = dynamic({
  component: () => import("@/views/Main/Mark/ClassMate")
});
const PaperDetail = dynamic({
  component: () => import("@/views/Main/Mark/PaperDetail")
});
const NotFound = dynamic({
  component: () => import("@/views/Main/NotFound")
});
const Forbidden = dynamic({
  component: () => import("@/views/Main/Forbidden")
});

export default {
  routes: [
    {
      id: "sub1",
      title: "router.questions",
      icon: "mail",
      children: [
        {
          id: "main-addQuestions",//后台权限id
          title: "router.questions.add",//国际化时用的id
          path: "/questions/add",//路由路径
          component: QuestionsAdd//路由组件
        },
        {
          title: "router.questions.type",
          path: "/questions/type",
          id: "main-questionsType",
          component: SourtQuestions
        },
        {
          title: "router.questions.view",
          path: "/questions/view",
          id: "main-watchQuestions",
          component: View
        },
        {
          title: "router.questions.detail",
          path: "/questions/detail/:id",
          id: "main-addQuestions",
          component: QuestionDetail,
          disable: true
        },
        {
          title: "router.questions.edit",
          path: "/questions/edit/:id",
          id: "main-addQuestions",
          component: QuestionEdit,
          disable: true
        }
      ]
    },
    {
      id: "sub2",
      title: "router.user",
      icon: "user",
      children: [
        {
          title: "router.user.addUser",
          id: "main-addUser",
          path: "/user/addUser",
          component: AddUser
        },
        {
          title: "router.user.show",
          id: "main-showUser",
          path: "/user/show",
          component: Show
        }
      ]
    },
    {
      id: "sub3",
      title: "router.exam",
      icon: "schedule",
      children: [
        {
          title: "router.exam.add",
          id: "main-addExam",
          path: "/exam/add",
          component: ExamAdd
        },
        {
          title: "router.exam.list",
          id: "main-examList",
          path: "/exam/list",
          component: ExamList
        },
        {
          title: "router.exam.edit",
          id: "main-examEdit",
          path: "/exam/edit",
          component: ExamEdit,
          disable: true
        },
        {
          title: "router.exam.detail",
          id: "main-examDetail",
          path: "/exam/detail/:id",
          component: ExamDetail,
          disable: true
        }
      ]
    },
    {
      id: "sub4",
      title: "router.class",
      icon: "project",
      children: [
        {
          title: "router.class.grade",
          path: "/class/grade",
          id: "main-grade",
          component: Grade
        },
        {
          title: "router.class.room",
          path: "/class/room",
          id: "main-room",
          component: Room
        },
        {
          title: "router.class.student",
          path: "/class/student",
          id: "main-student",
          component: Student
        }
      ]
    },
    {
      id: "sub5",
      title: "router.mark",
      icon: "project",
      children: [
        {
          title: "router.mark.classlist",
          path: "/mark/classlist",
          id: "main-examPaperClassList",
          component: MarkClassList
        },
        {
          title: "router.mark.classmate",
          path: "/mark/classmate/:id",
          id: "main-examPaperClassmate",
          component: MarkClassMate,
          disable: true
        },
        {
          title: "router.mark.examinationPapers",
          path: "/mark/paper/detail/:exam_student_id",
          id: "main-examinationPapers",
          component: PaperDetail,
          disable: true
        }
      ]
    },
    {
      id: "403",
      disable: true,
      children: [
        {
          id: "main",
          path: "/403",
          component: Forbidden,
          disable: true
        }
      ]
    },
    {
      id: "404",
      disable: true,
      children: [
        {
          id: "main",
          path: "",
          component: NotFound,
          disable: true
        }
      ]
    }
  ]
};
