class TodoAppController {
    constructor($scope, todoService) {
        "ngInject";
        this.name = 'todoApp';
        this.todoService = todoService;
        this.$scope = $scope;


        this.$onInit = () => {
            this.loadingRequest={};
        };

        this.resetTasks();

        $scope.pickItem = (index, from) => {

            this.selectedIndex = index;
            this.fromBucket = from;

        };

        $scope.allowDrop = (event) => {
            event.preventDefault();
        };

        $scope.dropItem = (target) => {

            if (target !== this.fromBucket) {

                this.todoList[this.selectedIndex].status = target;
                $scope.$apply();
                this.editTodo(this.todoList[this.selectedIndex],this.selectedIndex);

            } else {
                this.resetTasks();
            }
        }

    }


    resetTasks() {
        this.selectedIndex = false;
        this.fromBucket = false;

    }

    editTodo(task,index) {
        this.loadingRequest[index]=true;
        this.resetTasks();
        this.todoService.editTodo(task).then((response) => {
            this.todoList[index]=response.plain();
            this.loadingRequest[index]=false;
        });
    }

    addTodo(){
        this.todoList.push({
            title:'Title',
            description:'description',
            status:'notCompleted',
            createMode:true
            }
        );
    }

    updateTask(item,index){

        this.editTodo(item,index);
    }

    deleteTask(item) {
        let index=this.todoList.findIndex((task) => {
            return item._id == task._id;

        });


        this.todoService.apiDeleteTask(item).then((response) => {

        });

        this.todoList.splice(index,1);
    }


}
export default TodoAppController;
