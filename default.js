new Vue({
    el: "#app",
    data: {
        userInput: "",
        displayedMessages: [],
        allCommands: {
            help: [
                "coverPage -> Page de couverture",
                "personalIntro -> Présentation personnelle",
                "projet -> projet",
                "cv",
                "blocOne -> bloc 1",
                "btsSio -> presentation bts sio option slam",
                "greta -> presentation du greta",
                "competence -> voir les competence"
            ],
            coverPage: [
                "Je m'appelle Alan, et j'ai 25 ans, j'habite à Pleumeur et je suis fan de développement informatique !"
            ],
            personalIntro: [
                "J'ai créé deux jeux vidéo sur Unity, disponibles sur ma page GameJolt sous le compte 'alan121'.",
                "En outre, j'ai effectué un service civique au collège Yves Coppens en tant qu'aide aux devoirs.",
                "J'ai également initié un club au sein de ce même collège pour enseigner le HTML et le CSS."
            ],
            projet: [
                'Lien :',
                '<a href="https://gamejolt.com/games/mogs/481960" target="_blank">Jeu de plateforme "mogs"</a>',
                '<a href="https://gamejolt.com/games/runner_Adventure/495723" target="_blank">Jeu de course "Runne adventure"</a>'
            ],
            cv: [
                '<img src="Images/CVAlan.jpg" alt"cv"/>'
            ],
            blocOne: [
                '<p>Gérer le patrimoine informatique</p>',
                "<p>Répondre aux incidents et aux demandes d'assistance et d'évolution</p>",
                "<p>Développer la présence en ligne de l'organisation</p>",
                '<p>Travailler en mode projet</p>',
                '<p>Mettre à disposition des utilisateurs un service informatique</p>',
                '<p>Organiser son développement professionnel</p>'
            ],
            btsSio: [
                `Le BTS SIO option SLAM est un diplôme de bac+2 dans le domaine de l'informatique. 
                C'est un bts technique qui prépare les étudiants à des carrières en programmation et développement logiciel. 
                Le programme couvre des sujets tels que la programmation orientée objet, 
                le développement web et la modélisation de bases de données.`
            ],
            greta: [
                `Le GRETA est un réseau public de formation pour adultes en France, 
                offrant des formations adaptées aux besoins des entreprises et des individus, dans divers domaines. 
                Il permet d'acquérir de nouvelles compétences ou de se reconvertir professionnellement, 
                avec des formations modulables et certifiantes.`
            ],
            competence: [
                "Competence : ",
                "HTML : 80%",
                "css : 20%",
                "js : 30%",
                "python : 60%"
            ]
        },
        stopAnimation: false,
        timeoutId: null,
        showInput: true
    },
    mounted() {
        this.bootAnimation();
    },
    
    methods: {
        
        bootAnimation() {
            this.showInput = false;
            
            const bootMessages = [
                "Démarrage du système...",
                "[SUCCESS] Démarrage du système...",
                "Vérification des ressources système...",
                "[INFO] CPU détecté : Intel Core i7-9700K...",
                "[INFO] Mémoire : 16 Go de RAM...",
                "[INFO] Disque dur : 1 To SSD...",
                "[SUCCESS] Vérification des ressources terminée...",
                "Chargement des fichiers essentiels...",
                "[INFO] Chargement du noyau du système d'exploitation...",
                "[SUCCESS] Noyau chargé...",
                "[INFO] Chargement des pilotes de périphériques...",
                "[SUCCESS] Pilotes chargés...",
                "[INFO] Chargement des configurations utilisateur...",
                "[SUCCESS] Configurations chargées...",
                "Initialisation des composants...",
                "[INFO] Initialisation du système de fichiers...",
                "[SUCCESS] Système de fichiers initialisé...",
                "[INFO] Initialisation des services réseau...",
                "[SUCCESS] Services réseau initialisés...",
                "[INFO] Initialisation des interfaces utilisateur...",
                "[SUCCESS] Interfaces utilisateur initialisées...",
                "Préparation des applications au démarrage...",
                "[INFO] Lancement de l'interface graphique...",
                "[SUCCESS] Interface graphique lancée...",
                "[INFO] Chargement des applications de démarrage...",
                "[SUCCESS] Applications de démarrage chargées...",
                "Prêt à l'emploi...",
            ];

            this.animateBootMessages(bootMessages, 0);
        },
        animateBootMessages(messages, index) {
            if (index < messages.length && !this.stopAnimation) {
                const currentMessage = messages[index];
                this.displayedMessages.push(currentMessage);
                this.scrollToBottom();

                
                this.timeoutId = setTimeout(() => {
                    this.animateBootMessages(messages, index + 1);
                }, 100);
            } else {
                
                setTimeout(() => {
                    this.showPortfolioTitle();
                }, 500);
            }
        },
        showPortfolioTitle() {
            this.clearTerminal();
            const titleMessage = "Portfolio Alan Ladrait";
            this.displayedMessages.push(titleMessage);
            this.scrollToBottom();

            setTimeout(() => {
                this.clearTerminal();
                this.displayInstructions();
            }, 2000);
        },
        clearTerminal() {
            this.displayedMessages = [];
        },
        displayInstructions() {
            this.displayedMessages.push("Bienvenue sur le portfolio d'Alan Ladrait !");
            this.displayedMessages.push("Pour connaître les commandes, veuillez taper 'help'.");
            this.scrollToBottom();
            this.showInput = true;
        },
        handleInput() {
            this.stopCurrentAnimation();
            const inputValue = this.userInput.trim();
            this.displayedMessages.push(`$ ${inputValue}`);
            this.scrollToBottom();
            this.userInput = "";

            // Gestion des commandes
            if (this.allCommands[inputValue]) {
                this.animateMessages(this.allCommands[inputValue]);
            } else {
                this.displayedMessages.push("Commande non reconnue. Tapez 'help' pour obtenir de l'aide.");
                this.scrollToBottom();
            }
        },
        animateMessages(messages, index = 0) {
            if (index < messages.length && !this.stopAnimation) {
                let currentMessage = "";
                this.displayedMessages.push("");
                this.scrollToBottom();

                const updateMessage = () => {
                    if (currentMessage.length < messages[index].length && !this.stopAnimation) {
                        currentMessage += messages[index].charAt(currentMessage.length);
                        Vue.set(this.displayedMessages, this.displayedMessages.length - 1, currentMessage);
                        this.scrollToBottom();
                        this.timeoutId = setTimeout(updateMessage, 50);
                    } else if (!this.stopAnimation) {
                        this.animateMessages(messages, index + 1);
                    }
                };

                updateMessage();
            }
        },
        stopCurrentAnimation() {
            this.stopAnimation = true;
            clearTimeout(this.timeoutId);
            this.stopAnimation = false;
        },
        scrollToBottom() {
            const terminal = document.getElementById("terminal");
            terminal.scrollTop = terminal.scrollHeight;
        }
    }
});
