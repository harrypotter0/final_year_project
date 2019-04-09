def scrollDown(pause, driver):
    """
    Function to scroll down till end of page.
    """
    import time
    lastHeight = driver.execute_script("return document.body.scrollHeight")

    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(pause)
        newHeight = driver.execute_script("return document.body.scrollHeight")
        if newHeight == lastHeight:
            break
        lastHeight = newHeight

# Main Code
driver = webdriver.Chrome()

# Instantiate browser and navigate to page

driver.get('https://www.youtube.com/watch?v=iFPMz36std4')
scrollDown(6, driver)

# Page soup 
soup = BeautifulSoup(driver.page_source, "html.parser")


# from selenium import webdriver

# import time

# driver=webdriver.Chrome()

# driver.get('https://www.youtube.com/watch?v=iFPMz36std4')

# driver.execute_script('window.scrollTo(1, 500);')

# #now wait let load the comments
# time.sleep(5)

# driver.execute_script('window.scrollTo(1, 3000);')



# comment_div=driver.find_element_by_xpath('//*[@id="contents"]')
# comments=comment_div.find_elements_by_xpath('//*[@id="content-text"]')
# for comment in comments:
#     print(comment.text)


