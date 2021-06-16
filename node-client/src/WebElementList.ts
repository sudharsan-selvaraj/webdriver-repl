class WebElementList {

    constructor(private readonly elements: any) {
        if (!this.elements) {
            this.elements = [];
        }
    }

    private getElements() {
        return this.elements;
    }

    get(index: number) {
        return this.getElements().get(index)
    }

    first() {
        return this.get(0)
    }

    last() {
        return this.get(this.getElements().size() - 1)
    }

    clear() {
        let text: string[] = [];
        for (var i = 0; i < this.getElements().size(); i++) {
            text.push(this.getElements().get(i).clear())
        }
        return text;
    }

    getText() {
        let text: string[] = [];
        for (var i = 0; i < this.getElements().size(); i++) {
            text.push(this.getElements().get(i).getText())
        }
        return text;
    }

    getAttribute(attribute: string) {
        let text: string[] = [];
        for (var i = 0; i < this.getElements().size(); i++) {
            text.push(this.getElements().get(i).getAttribute(attribute))
        }
        return text;
    }

    isEnabled() {
        let text: string[] = [];
        for (var i = 0; i < this.getElements().size(); i++) {
            text.push(this.getElements().get(i).isEnabled())
        }
        return text;
    }

    isDisplayed() {
        let text: string[] = [];
        for (var i = 0; i < this.getElements().size(); i++) {
            text.push(this.getElements().get(i).isDisplayed())
        }
        return text;
    }

    isSelected() {
        let text: string[] = [];
        for (var i = 0; i < this.getElements().size(); i++) {
            text.push(this.getElements().get(i).isSelected())
        }
        return text;
    }

    toList() {
        return this.getElements();
    }

}

export {
    WebElementList
}