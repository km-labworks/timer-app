type TabMenuProps = {
    currentPage: string;//現在表示しているページの状態を管理するための変数
    onChange: (page: string) => void;//タブが押されたときにAppへ「ページを変えて！」と伝える関数
};

function TabMenu({ currentPage, onChange }: TabMenuProps) {
    return (
        <nav>
            <button
                onClick = {() => onChange ("timer")}
                className = {currentPage === "timer" ? "active" : ""}
            >
                Timer
            </button>

            <button
                //Alarmボタンをクリックしたら onChange を実行して、「alarmに変更して」とApp.tsxに伝える
                onClick = {() => onChange ("alarm")}
                //現在表示しているページがalarmならactiveクラスを付与する
                className = {currentPage === "alarm" ? "active" : ""}
            >
                Alarm
            </button>

            <button
                onClick = {() => onChange ("stopwatch")}
                className = {currentPage === "stopwatch" ? "active" : ""}
            >
                Stopwatch
            </button>
        </nav>
    );
}

export default TabMenu;