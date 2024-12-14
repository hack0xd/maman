import turtle
import random

# تنظیمات اولیه
screen = turtle.Screen()
screen.bgcolor("lightblue")
screen.title("نبرد تانک‌ها")
screen.setup(width=800, height=600)
screen.tracer(0)

# طراحی تانک با شکل سفارشی
screen.register_shape("tank1_shape", ((-20,-10), (20,-10), (20,10), (-20,10), (-15,20), (15,20), (-15,-20), (15,-20)))
screen.register_shape("tank2_shape", ((-20,-10), (20,-10), (20,10), (-20,10), (-15,20), (15,20), (-15,-20), (15,-20)))

# ایجاد تانک اول
tank1 = turtle.Turtle()
tank1.shape("tank1_shape")
tank1.color("red")
tank1.penup()
tank1.goto(-300, -250)

# ایجاد تانک دوم
tank2 = turtle.Turtle()
tank2.shape("tank2_shape")
tank2.color("blue")
tank2.penup()
tank2.goto(300, -250)

# ایجاد گلوله‌ها
bullet1 = turtle.Turtle()
bullet1.shape("circle")
bullet1.color("red")
bullet1.penup()
bullet1.speed(0)
bullet1.hideturtle()

bullet2 = turtle.Turtle()
bullet2.shape("circle")
bullet2.color("blue")
bullet2.penup()
bullet2.speed(0)
bullet2.hideturtle()

# طراحی هزارتو
def create_wall(x, y, width, height):
    wall = turtle.Turtle()
    wall.shape("square")
    wall.color("black")
    wall.shapesize(stretch_wid=height/20, stretch_len=width/20)
    wall.penup()
    wall.goto(x, y)
    return wall

walls = [
    create_wall(0, 0, 600, 20),
    create_wall(0, 200, 20, 400),
    create_wall(200, -100, 200, 20),
    create_wall(-200, -200, 20, 200),
    create_wall(100, 100, 300, 20),
]

# سرعت حرکت تانک‌ها و گلوله‌ها
tank_speed = 15
bullet_speed = 20

# وضعیت گلوله‌ها
bullet1_state = "ready"
bullet2_state = "ready"

# کنترل تانک اول
def tank1_left():
    x = tank1.xcor()
    if x > -380:
        tank1.setx(x - tank_speed)

def tank1_right():
    x = tank1.xcor()
    if x < 380:
        tank1.setx(x + tank_speed)

def tank1_up():
    y = tank1.ycor()
    if y < 280:
        tank1.sety(y + tank_speed)

def tank1_down():
    y = tank1.ycor()
    if y > -280:
        tank1.sety(y - tank_speed)

def fire_bullet1():
    global bullet1_state
    if bullet1_state == "ready":
        bullet1_state = "fire"
        bullet1.goto(tank1.xcor(), tank1.ycor() + 10)
        bullet1.showturtle()

# کنترل تانک دوم
def tank2_left():
    x = tank2.xcor()
    if x > -380:
        tank2.setx(x - tank_speed)

def tank2_right():
    x = tank2.xcor()
    if x < 380:
        tank2.setx(x + tank_speed)

def tank2_up():
    y = tank2.ycor()
    if y < 280:
        tank2.sety(y + tank_speed)

def tank2_down():
    y = tank2.ycor()
    if y > -280:
        tank2.sety(y - tank_speed)

def fire_bullet2():
    global bullet2_state
    if bullet2_state == "ready":
        bullet2_state = "fire"
        bullet2.goto(tank2.xcor(), tank2.ycor() + 10)
        bullet2.showturtle()

# کنترل صفحه‌کلید
screen.listen()
screen.onkeypress(tank1_left, "a")
screen.onkeypress(tank1_right, "d")
screen.onkeypress(tank1_up, "w")
screen.onkeypress(tank1_down, "s")
screen.onkeypress(fire_bullet1, "q")
screen.onkeypress(tank2_left, "Left")
screen.onkeypress(tank2_right, "Right")
screen.onkeypress(tank2_up, "Up")
screen.onkeypress(tank2_down, "Down")
screen.onkeypress(fire_bullet2, "m")

# حلقه اصلی بازی
while True:
    screen.update()

    # حرکت گلوله اول
    if bullet1_state == "fire":
        bullet1.sety(bullet1.ycor() + bullet_speed)
        if bullet1.ycor() > 300 or any(bullet1.distance(wall) < 20 for wall in walls):
            bullet1.hideturtle()
            bullet1_state = "ready"

    # حرکت گلوله دوم
    if bullet2_state == "fire":
        bullet2.sety(bullet2.ycor() + bullet_speed)
        if bullet2.ycor() > 300 or any(bullet2.distance(wall) < 20 for wall in walls):
            bullet2.hideturtle()
            bullet2_state = "ready"

    # بررسی برخورد گلوله‌ها به تانک‌ها
    if bullet1.distance(tank2) < 20:
        tank2.hideturtle()
        bullet1.hideturtle()
        print("تانک قرمز برنده شد!")
        break

    if bullet2.distance(tank1) < 20:
        tank1.hideturtle()
        bullet2.hideturtle()
        print("تانک آبی برنده شد!")
        break

screen.mainloop()
