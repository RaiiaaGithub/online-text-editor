from datetime import datetime

class DeadlineTree:
    """
    Árvore Dinâmica de Prazos.
    Representa tarefas organizadas por data ou prazo numa estrutura de árvore binária.
    """

    class Node:
        def __init__(self, task, deadline):
            self.task = task
            self.deadline = deadline
            self.left = None
            self.right = None

    def __init__(self):
        self.root = None

    def is_valid_date(self, date_str):
        try:
            datetime.strptime(date_str, "%Y-%m-%d")
            return True
        except ValueError:
            return False

    def addTask(self, task, deadline):
        """
        task: Descrição da tarefa.
        deadline: Prazo da tarefa (formato: YYYY-MM-DD).
        """
        if not self.is_valid_date(deadline):
            raise ValueError(f"Data inválida: {deadline}. Use o formato YYYY-MM-DD.")
        self.root = self.insert(self.root, task, deadline)

    def insert(self, node, task, deadline):
        if node is None:
            return self.Node(task, deadline)

        if deadline < node.deadline:
            node.left = self.insert(node.left, task, deadline)
        else:
            node.right = self.insert(node.right, task, deadline)
        return node

    def remove(self, node, deadline):
        if node is None:
            return None

        if deadline < node.deadline:
            node.left = self.remove(node.left, deadline)
        elif deadline > node.deadline:
            node.right = self.remove(node.right, deadline)
        else:
            if node.left is None:
                return node.right
            if node.right is None:
                return node.left

            min_larger_node = self._find_min(node.right)
            node.task, node.deadline = min_larger_node.task, min_larger_node.deadline
            node.right = self.remove(node.right, min_larger_node.deadline)

        return node

    def removeTask(self, deadline):
        if not self.is_valid_date(deadline):
            raise ValueError(f"Data inválida: {deadline}. Use o formato YYYY-MM-DD.")
        self.root = self.remove(self.root, deadline)

    def findMin(self, node):
        while node.left is not None:
            node = node.left
        return node

    def get_next_task(self):
        if self.root is None:
            raise ValueError("Nenhuma tarefa na árvore.")
        next_task = self.findMin(self.root)
        return next_task.task, next_task.deadline

    def inOrder(self, node):
        if node is not None:
            self.inOrder(node.left)
            print(f"\tTarefa: {node.task}, Prazo: {node.deadline}")
            self.inOrder(node.right)

    def display_in_order(self):
        """Exibe as tarefas em ordem de prazo."""
        self.inOrder(self.root)


# Exemplo de execução
tree = DeadlineTree()
while True:
    print("\n1. Adicionar tarefa")
    print("2. Remover tarefa")
    print("3. Próxima tarefa")
    print("4. Exibir tarefas")
    print("5. Sair")
    choice = input("Escolha uma opção: ")

    if choice == "1":
        task = input("Descrição da tarefa: ")
        deadline = input("Prazo da tarefa (YYYY-MM-DD): ")
        try:
            tree.addTask(task, deadline)
            print("Tarefa adicionada com sucesso.")
        except ValueError as e:
            print(e)
    elif choice == "2":
        deadline = input("Informe o prazo da tarefa a remover (YYYY-MM-DD): ")
        try:
            tree.removeTask(deadline)
        except ValueError as e:
            print(e)
    elif choice == "3":
        try:
            task, deadline = tree.get_next_task()
            print(f"Próxima tarefa: {task}, Prazo: {deadline}")
        except ValueError as e:
            print(e)
    elif choice == "4":
        print("\nTarefas em ordem de prazo:")
        tree.display_in_order()
    elif choice == "5":
        print("Saiu do programa...")
        break
    else:
        print("Opção inválida, tente novamente.")
