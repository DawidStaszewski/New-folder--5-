<template>
    <div class=" w-full flex justify-center relative _mainTop ">
        <div class="
                    _mainMenu
                    w-full
                    fixed      
                    bg-black
                    text-white
                    top-0
                    py-2
                    flex
                ">
            <div class="_top flex w-full justify-between h-15 px-4 overflow-hidden">
                <div class="flex items-center gap-4">
                    <div><button @click="OfertyPracy">OfertyPracy</button></div>
                    <div><button @click="OfertyPracy">Proponowane Oferty(jak sie zrobi quizz)</button></div>
                    <div>Biuro Karier</div>
                    <div><button @click="MainLogin">Duże Korporacje i Firmy</button></div>
                </div>
                <div class="flex justify-between items-center gap-4">
                    <div class="border rounded-xl px-5 py-2"><button @click="ProfilStudent">Profil</button></div>
                    <div class="border rounded-xl px-5 py-2"><button @click="MainLogin">Zaloguj sie</button></div>
                    <div class="border rounded-xl px-5 py-2"><button @click="Form">Utwórz Konto</button></div>
                </div>
            </div>
        </div>

        <div class="bottom-0 left-50 h-50 w-50 absolute"></div>
    </div>
</template>

<script>
export default {
    methods: {
        MainLogin() {
            this.$router.push('/Login');
        },
        OfertyPracy() {
            this.$router.push('/Main');
        },
        Login() {
            this.$router.push('/LoginView');
        },
        Form() {
            this.$router.push('/Form');
        },
        ProfilStudent() {
            this.$router.push('/StudentForm');
        },
    }
}
</script>

<style></style>