function injectErrorAssets() {
    const style = document.createElement('style');
    style.textContent = `
                .wd_repl_alert {
                  padding: 20px;
                  background-color: #f44336;
                  color: white;
                  position: relative;
                  z-index: 1000
                }
                .wd_repl_alert_close {
                  margin-left: 15px;
                  color: white;
                  font-weight: bold;
                  float: right;
                  font-size: 22px;
                  line-height: 20px;
                  cursor: pointer;
                  transition: 0.3s;
                }
                
                .hide {
                    display: none!important;
                }
                
                .wd_repl_alert_close:hover {
                  color: black;
                }`;
    document.head.append(style);

    const errorDiv = document.createElement("div");
    errorDiv.classList.add("wd_repl_alert");
    errorDiv.classList.add("hide");
    errorDiv.innerHTML = `<span class="wd_repl_alert_close">&times;</span> 
                          <strong>Error:</strong> <p class="message">Indicates a dangerous or potentially negative action.</p>`
    document.body.prepend(errorDiv);
    document.querySelector(".wd_repl_alert_close").addEventListener("click", function () {
        document.querySelector(".wd_repl_alert").classList.add("hide");
    })
}

function showErrorBanner() {
    document.querySelector(".wd_repl_alert .message").innerText = arguments[0] || "";
    if (document.querySelector(".wd_repl_alert").classList.contains("hide")) {
        document.querySelector(".wd_repl_alert").classList.remove("hide");
        setTimeout(function () {
            document.querySelector(".wd_repl_alert").classList.add("hide")
        }, 30000);
    }
}

function injectCss() {
    const style = document.createElement('style');
    style.textContent = `
        .wd-repl-highlight {
            border: 3px dashed #5763E5 !important
        }
    `;
    document.head.append(style);
}

function highlighter() {
    var elements = arguments[0];
    var CSS_CLASS_NAME = "wd-repl-highlight";

    document
        .querySelectorAll("." + CSS_CLASS_NAME)
        .forEach(e => e.classList.remove(CSS_CLASS_NAME))

    if (!elements || !elements.length) {
        return;
    }

    for (var e of elements) {
        e.classList.add(CSS_CLASS_NAME)
    }
}